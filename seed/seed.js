import mongoose from "mongoose";
import dotenv from "dotenv";

import Category from "../models/category.js";
import Item from "../models/item.js";
import ItemVolume from "../models/itemVolume.js";

dotenv.config();

const seedData = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  await Category.deleteMany({});
  await Item.deleteMany({});
  await ItemVolume.deleteMany({});

  const categories = await Category.insertMany([
    { id: 1, name: "קטגוריה ראשונה" },
    { id: 2, name: "קטגוריה שנייה" }
  ]);

  const itemsData = [
    { id: 1, name: "פריט 1", category: categories[0]._id },
    { id: 2, name: "פריט 2", category: categories[0]._id },
    { id: 3, name: "פריט 3", category: categories[1]._id },
    { id: 4, name: "פריט 4", category: categories[1]._id },
    { id: 5, name: "פריט 5", category: categories[0]._id },
    { id: 6, name: "פריט 6", category: categories[1]._id },
    { id: 7, name: "פריט 7", category: categories[0]._id },
    { id: 8, name: "פריט 8", category: categories[1]._id },
    { id: 9, name: "פריט 9", category: categories[0]._id },
    { id: 10, name: "פריט 10", category: categories[1]._id }
  ];

  const items = await Item.insertMany(itemsData);

  const volumesData = [];

  for (const item of items) {
    volumesData.push({
      item: item._id,
      price: 100,
      months: 1,
      entries: null
    });

    volumesData.push({
      item: item._id,
      price: 150,
      months: 3,
      entries: null
    });
  }

  await ItemVolume.insertMany(volumesData);

  console.log("Data seeded successfully");
  await mongoose.disconnect();
};

seedData().catch(err => {
  console.error(err);
  process.exit(1);
});
