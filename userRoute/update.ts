import User from "../schema/registerSchema";
import { Request, Response } from "express";
import { update, updateData } from "../service/updateService";
import bcrypt from "bcrypt";

export const updateFunction = async (req: Request, res: Response) => {
  try {
    const paylaod = updateData.safeParse(req.body);

    if (!paylaod.success) {
      res.status(400).json({
        msg: "cannot update user data plase try again",
      });
      return;
    }

    const userInfo = req.user;
    const findUser = await User.findOne({ _id: userInfo?.userId });
    const { username, password, email } = paylaod.data;

    if (!findUser || !username || !password || !email) {
      res.status(404).json({
        msg: "user not found",
      });
      return;
    }
    const hash: string = await (bcrypt.hash(password, 10) as Promise<string>);
    await update(findUser._id.toString(), username, hash, email);

    res.status(201).json({
      msg: "success to update data",
      "new data": {
        username: username,
        email: email,
      },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({
        msg: "cannot user current data",
      });
      return;
    }
    console.error(error);
  }
};
