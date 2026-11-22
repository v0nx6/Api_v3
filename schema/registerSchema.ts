import mongoose, { Document, Schema } from "mongoose";

export interface userSchema extends Document {
  username: string;
  email: string;
  password: string;
  createAt: Date;
  updateAt: Date;
  refreshToken?: string;
}

const registerSchema = new Schema<userSchema>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<userSchema>("User", registerSchema);
export default User;
