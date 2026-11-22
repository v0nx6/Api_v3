import User from "../schema/registerSchema";
import { z } from "zod";

export const registerRequired = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

type registers = z.infer<typeof registerRequired>;

export async function DbSave(data: registers) {
  try {
    const newUser = await User.create({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    return newUser;
  } catch (error) {
    throw error;
  }
}
