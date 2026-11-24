import mongoose, { Document, Schema } from "mongoose";

interface cartRequired extends Document {
  itemId: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  quantity: number;
}

const cartSchema = new Schema<cartRequired>({
  itemId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  seller: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
