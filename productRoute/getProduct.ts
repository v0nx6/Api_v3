import Product from "../schema/productSchema";
import { Request, Response } from "express";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const getProduct = await Product.find().populate("seller", "username");

    res.status(200).json({
      data: getProduct,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
