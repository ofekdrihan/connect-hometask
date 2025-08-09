import Category from "../models/category.js";
import Item from "../models/item.js";
import ItemVolume from "../models/itemVolume.js";
import { getItemsWithVolumes } from "../utils/getItemsWithVolume.js";
import { getNextId } from "../utils/getNextId.js";

//Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, code: 400, message: "Category's name is required" });
    }

    const catExist = await Category.findOne({ name });
    if (catExist) {
      return res.status(400).json({ success: false, code: 400, message: "Category already exists" });
    }

    const newId = await getNextId("categoryId");
    const category = await Category.create({ id: newId, name });

    res.json({ success: true, code: 200, 
        data: {
            id: category.id,
            name: category.name 
        } });
  } catch (err) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

// Get the category by his ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });
    if (!category) {
      return res.status(404).json({ success: false, code: 404, message: "Category not found" });
    }

    const foundItems = await Item.find({ category: category._id });
    const items = await getItemsWithVolumes(foundItems);
    
    res.json({ 
        success: true, code: 200, data: {
        category: {
          id: category.id,
          name: category.name,
          items
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, code: 500, message: err.message });
}
};