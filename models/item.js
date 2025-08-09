import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true }
});

const Item = mongoose.model('item', itemSchema);

export default Item;