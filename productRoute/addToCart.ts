import { Request, Response } from "express";
import Product from "../schema/productSchema";
import { z } from "zod";
import { addToCart } from "../service/addToCartService";

const cartRequirement = z.object({
  itemId: z.string(),
});

export const addCart = async (req: Request, res: Response) => {
  try {
    const payload = cartRequirement.safeParse(req.body);

    if (!payload.success) {
      res.status(400).json({
        msg: "cannot add product to cart make sure you data is correct",
      });
      return;
    }

    const findProduct = await Product.findOne({ _id: payload.data.itemId });

    if (!findProduct) {
      res.status(404).json({
        msg: "product not found",
      });
      return;
    }

    const middlewareResult = req.user;

    if (!middlewareResult) {
      res.status(403).json({
        msg: "forbidden",
      });
      return;
    }

    const userId = middlewareResult.userId;

    await addToCart(userId.toString(), findProduct._id.toString());

    res.status(200).json({
      msg: "succes to add product",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
