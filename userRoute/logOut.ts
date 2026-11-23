import User from "../schema/registerSchema";
import { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const findUser = await User.findOne({ _id: userId });

    if (!findUser) {
      res.status(404).json({
        msg: "user not found",
      });
      return;
    }

    await User.updateOne({ _id: userId }, { $unset: { refreshToken: "" } });

    res.clearCookie("jwt");
    res.status(200).json({
      msg: "succes to logout",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
