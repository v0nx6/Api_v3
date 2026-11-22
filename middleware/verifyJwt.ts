import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";

interface jwtRequire extends JwtPayload {
  userInfo: {
    username: string;
    userId: string;
  };
}
export const verifyJwt = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cookie = req.headers.authorization;

    if (!cookie?.startsWith("Bearer")) {
      res.status(403).json({
        msg: "Forbidden",
      });
      return;
    }

    const token = cookie.split(" ")[1];
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      console.log("secret not found in .env files");
      return;
    }

    const verify = jwt.verify(token, secretKey) as jwtRequire;

    req.user = verify.userInfo;

    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
