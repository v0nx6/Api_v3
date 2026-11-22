import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response } from "express";
import User from "../schema/registerSchema";
import { loginRequired, loginService } from "../service/loginService";

export const login = async (req: Request, res: Response) => {
  try {
    const request = loginRequired.safeParse(req.body);

    if (!request.success) {
      res.status(400).json({
        msg: request.error.issues,
      });
      return;
    }

    const { username, password } = request.data;
    const passwordUser = await User.findOne({ username: username });

    if (!passwordUser) {
      res.status(404).json({
        msg: "username and password wrong",
      });
      return;
    }

    const compare = await bcrypt.compare(password, passwordUser.password);

    if (!compare) {
      res.status(404).json({
        msg: "username and password wrong debug",
      });
      return;
    }

    const jwtToken = process.env.JWT_SECRET;
    const refreshToken = process.env.JWT_VERIFY;

    if (!jwtToken || !refreshToken) {
      throw new Error("jwt secret not found insine .env files");
    }

    const createToken = jwt.sign(
      {
        userInfo: {
          username: username,
          userId: passwordUser._id,
        },
      },
      jwtToken,
      { expiresIn: "15m" },
    );

    const createRefresh = jwt.sign(
      {
        userInfo: {
          username: username,
          userID: passwordUser._id,
        },
      },
      refreshToken,
      { expiresIn: "1d" },
    );

    await loginService(passwordUser._id.toString(), createRefresh);

    res.cookie("jwt", createToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.status(200).json({
      msg: "success to login",
      username: passwordUser.username,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
