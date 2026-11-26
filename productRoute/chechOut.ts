import mongoose from "mongoose";
import Cart from "../schema/cartSchema";
import { Request, Response } from "express";

export const checkOut = async (req: Request, res: Response) => {
  try {
    const userInfo = req.user;

    if (!userInfo) {
      res.status(404).json({
        msg: "not found",
      });
      return;
    }

    const userId = userInfo.userId;

    const findCart = await Cart.find({ seller: userId });

    if (findCart.length === 0) {
      res.status(404).json({
        msg: "your cart is empty",
      });
      return;
    }

    const carts = await Cart.find({ seller: userId }).populate(
      "itemId",
      "price itemName",
    );

    carts.reduce((accumulator, nextValue) => {
      const price = nextValue.itemId;

      if (!price || price instanceof mongoose.Types.ObjectId) {
        return accumulator;
      }
      return accumulator + price.price * nextValue.quantity;
    }, 0);

    await Cart.deleteMany({ seller: userId });

    res.status(200).json({
      msg: "succes to checkOut",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
