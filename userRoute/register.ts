import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { DbSave } from "../service/registerService";
import { registerRequired } from "../service/registerService";

export const registersRoute = async (req: Request, res: Response) => {
  try {
    const result = registerRequired.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        msg: result.error.issues,
      });
      return;
    }

    const { username, email, password } = result.data;

    const hash = await bcrypt.hash(password, 10);

    const saveResult = await DbSave({
      username,
      email,
      password: hash,
    });

    res.status(201).json({
      msg: "success to register",
      username: saveResult.username,
      email: saveResult.email,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({
        msg: "username and email are already registered",
      });
      return;
    }
    res.sendStatus(500);
    console.error(error);
  }
};
