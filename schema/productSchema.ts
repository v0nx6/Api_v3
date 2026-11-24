import mongoose, { Document, Schema } from "mongoose";

export interface productRequirement extends Document {
  itemName: string;
  price: number;
  stock: number;
  description?: string;
  seller: mongoose.Types.ObjectId;
}

const productSchema = new Schema<productRequirement>(
  {
    itemName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    seller: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
