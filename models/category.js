import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true }
})

const Category = mongoose.model('category', categorySchema);

export default Category;
