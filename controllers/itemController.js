import Item from "../models/item.js";
import ItemVolume from "../models/itemVolume.js";
import Category from "../models/category.js";
import { getNextId } from "../utils/getNextId.js";
import { getItemsWithVolumes } from "../utils/getItemsWithVolume.js";

// Create a new item if not exist or update him if exist
export const createOrUpdateItem = async (req, res) => {
  try {
    const { name, categoryId, volumes, itemId } = req.body;
    if (!name || !categoryId || !Array.isArray(volumes) || volumes.length === 0) {
        return res.status(400).json({ success: false, code: 400, message: "Invalid input" });
    }

    if (!volumes.every(v => v.price && (v.months || v.entries))) {
        return res.status(400).json({ success: false, code: 400, message: "Each volume must have price and months or entries" });
    }

    const invalidVolume = volumes.some(v => v.months && v.entries);
    if (invalidVolume){
        return res.status(400).json({ success: false, code: 400, message: "A volume cannot contain both months and entries" });
    }
    
    const category = await Category.findOne({ id: categoryId });
    if (!category) {
        return res.status(404).json({ success: false, code: 404, message: "Category not found" });
    }

    let item;

    if (itemId) {
        item = await Item.findOne({ id: itemId });
        if (!item) {
            return res.status(404).json({ success: false, code: 404, message: "Item not found for update" });
        }

        const nameConflict = await Item.findOne({ name, id: { $ne: itemId } });
        if (nameConflict) {
            return res.status(400).json({ success: false, code: 400, message: "Item name already exists" });
        }

        item.name = name;
        item.category = category._id;
        await item.save();

    } else {
        const existingItem = await Item.findOne({ name });
        if (existingItem) {
            return res.status(409).json({
                success: false,
                code: 409,
                message: "Item name already exists. Add itemId to update existing item."
            });
        }

        const newId = await getNextId("itemId");
        item = await Item.create({ id: newId, name, category: category._id });
    }

    await ItemVolume.deleteMany({ item: item._id });
    const volumeDocs = await ItemVolume.insertMany(
      volumes.map(v => ({
        item: item._id,
        price: v.price,
        months: v.months,
        entries: v.entries
      }))
    );

    res.json({
      success: true, 
      code: 200,
      data: { 
        id: item.id, 
        name: item.name,
        volumes: volumeDocs.map(v => ({
          value: v.entries ? `${v.entries} כניסות`: `${v.months} חודשים`,
          price: v.price.toFixed(2)
        }))
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

// Provide us all the items we got
export const getAllItems = async (req, res) => {
  try {
    const foundItems = await Item.find();
    const items = await getItemsWithVolumes(foundItems);
    res.json({ success: true, code: 200, data: { items } });
  } catch (err) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

// Get the item by his ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({ id: req.params.id })
    if (!item) {
      return res.status(404).json({ success: false, code: 404, message: "Item not found" });
    }
    const volumes = await ItemVolume.find({ item: item._id });
    if (volumes.length === 0){
        return res.status(400).json({ success: false, code: 400, message: "Item must have at least one volume"});
    }
    res.json({
      success: true,
      code: 200,
      data: { 
        id: item.id,
        name: item.name,
        volumes: volumes.map(v => ({
          value: v.entries ? `${v.entries} כניסות` : `${v.months} חודשים`,
          price: v.price.toFixed(2)
        }))
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

// Search for an item by keyword in the query string
export const searchItem = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ success: false, code: 400, message: "Missing search query 'q'" });
    }

    const itemSearch = await Item.find({ name: { $regex: query, $options: "i" }});
    const items = await getItemsWithVolumes(itemSearch);
    const catSearch = await Category.find({ name: { $regex: query, $options: "i" }});
    const categories = catSearch.map(category => ({ id: category.id, name: category.name }));

    res.json({ success: true, code: 200, 
        data: {
         categories,
          items
         }
        });
  } catch (err) { res.status(500).json({ success: false, code: 500, message: err.message });}};