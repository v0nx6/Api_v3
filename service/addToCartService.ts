import Cart from "../schema/cartSchema";
import mongoose from "mongoose";

export async function addToCart(seller: string, itemId: string) {
  try {
    const findProduct = await Cart.findOne({
      seller: new mongoose.Types.ObjectId(seller),
      itemId: new mongoose.Types.ObjectId(itemId),
    });

    if (findProduct) {
      findProduct.quantity += 1;
      return await findProduct.save();
    }

    await Cart.create({
      seller: new mongoose.Types.ObjectId(seller),
      itemId: new mongoose.Types.ObjectId(itemId),
      quantity: 1,
    });
  } catch (error) {
    throw error
  }
}
