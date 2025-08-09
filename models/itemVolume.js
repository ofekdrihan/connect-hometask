import mongoose from "mongoose";

const itemVolumeSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'item', required: true },
  price: { type: Number, required: true },
  months: { type: Number },
  entries: { type: Number }
});
itemVolumeSchema.index({ item: 1, price: 1 }, { unique: true });
const ItemVolume = mongoose.models.items_volumes || mongoose.model('items_volumes', itemVolumeSchema);

export default ItemVolume;