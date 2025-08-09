import ItemVolume from "../models/ItemVolume.js";
export const getItemsWithVolumes = async (items) => {
  return await Promise.all(items.map(async (item) => {
    const volumes = await ItemVolume.find({ item: item._id });
    return {
      id: item.id,
      name: item.name,
      volumes: volumes.map(v => ({
        value: v.entries ? `${v.entries} כניסות` : `${v.months} חודשים`,
        price: v.price.toFixed(2) 
      }))
    };
  }));
};