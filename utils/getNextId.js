import Counter from "../models/counter.js";

export const getNextId = async (sequenceName) => {
  const counter = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};
