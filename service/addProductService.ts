import mongoose from "mongoose";
import Product from "../schema/productSchema";
import { z } from "zod";

export const addProductRequirement = z.object({
  itemName: z.string(),
  price: z.number(),
  stock: z.number(),
  description: z.string().optional(),
});

type product = z.infer<typeof addProductRequirement>;

export async function addProduct(data: product, userId: string) {
  try {
    await Product.create({
      itemName: data.itemName,
      price: data.price,
      stock: data.stock,
      description: data.description,
      seller: new mongoose.Types.ObjectId(userId),
    });
  } catch (error) {
    throw error;
  }
}
