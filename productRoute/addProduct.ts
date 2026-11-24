import { Request, Response } from "express";
import { addProductRequirement } from "../service/addProductService";
import { addProduct } from "../service/addProductService";
import Product from "../schema/productSchema";

export const add = async (req: Request, res: Response) => {
  try {
    const product = addProductRequirement.safeParse(req.body);

    if (!product.success) {
      res.status(400).json({
        msg: "cannot add product. make sure your data is correct",
      });
      return;
    }

    const { itemName, price, stock } = product.data;

    const userInfo = req.user;

    if (!userInfo) {
      res.status(404).json({
        msg: "Unauthorized",
      });
      return;
    }

    const userId = userInfo.userId;

    const findProduct = await Product.findOne({
      $and: [{ itemName: product.data.itemName }, { seller: userId }],
    });

    if (findProduct) {
      res.status(409).json({
        msg: "you already add this produt",
      });
      return;
    }

    await addProduct(product.data, userId);

    res.status(200).json({
      msg: "success to add new product",
      data: {
        itemName: itemName,
        price: price,
        stock: stock,
      },
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
