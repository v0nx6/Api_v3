import User from "../schema/registerSchema";
import { Request, Response } from "express";

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user;

    const findUser = await User.findOne({ _id: userId?.userId });

    if (!findUser) {
      res.status(404).json({
        msg: "user not found",
      });
      return;
    }

    await User.deleteOne({ _id: findUser._id });

    res.status(200).json({
      msg: "succes to delete profile",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
