import mongoose, { Document, Schema, PopulatedDoc } from "mongoose";
import { productRequirement } from "./productSchema";
import { userSchema } from "./registerSchema";

interface cartRequired extends Document {
  itemId: PopulatedDoc<productRequirement>;
  seller: PopulatedDoc<userSchema>;
  quantity: number;
}

const cartSchema = new Schema<cartRequired>({
  itemId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Product",
    required: true,
  },
  seller: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model<cartRequired>("Cart", cartSchema);
export default Cart;
