import Counter from "../models/counter.js";

export async function resetCounters() {
  await Counter.updateOne({ _id: "categoryId" }, { $set: { seq: 0 } });
  await Counter.updateOne({ _id: "itemId" }, { $set: { seq: 0 } });
  console.log("Counters reset to 0");
}
