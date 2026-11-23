import User from "../schema/registerSchema";
import { z } from "zod";

export const updateData = z.object({
  username: z.string().optional(),
  password: z.string().min(8).optional(),
  email: z.string().optional(),
});

export async function update(
  userId: string,
  username?: string,
  password?: string,
  email?: string,
) {
  try {
    const updateFields: any = {};

    if (username !== undefined) updateFields.username = username;

    if (password !== undefined) updateFields.password = password;

    if (email !== undefined) updateFields.email = email;

    const user = await User.updateOne(
      { _id: userId },
      {
        $set: updateFields,
      },
    );

    return user;
  } catch (error) {
    throw error;
  }
}
