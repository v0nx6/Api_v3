import User from "../schema/registerSchema";
import { z } from "zod";

export const loginRequired = z.object({
  username: z.string(),
  password: z.string().min(8),
});

export async function loginService(userId: string, refreshToken: string) {
  await User.updateOne(
    { _id: userId },
    { $set: { refreshToken: refreshToken } },
  );
}
