import mongoose from "mongoose";
import dotenv from "dotenv";
import Counter from "../models/counter.js";

dotenv.config();

export const resetCounters = async () => {
  await Counter.updateOne({ _id: "categoryId" }, { $set: { seq: 0 } });
  await Counter.updateOne({ _id: "itemId" }, { $set: { seq: 0 } });
  console.log("Counters reset to 0");
};

const main = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await resetCounters();
  await mongoose.disconnect();

main();
