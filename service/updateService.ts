import User from "../schema/registerSchema";
import { z } from "zod";

export const updateData = z
  .object({
    username: z.string(),
    password: z.string().min(8),
    email: z.string(),
  })
  .partial();

export async function update(
  userId: string,
  username: string,
  password: string,
  email: string,
) {
  try {
    const user = await User.updateOne(
      { _id: userId },
      {
        $set: { username: username, password: password, email: email },
      },
    );

    return user;
  } catch (error) {
    throw error;
  }
}
