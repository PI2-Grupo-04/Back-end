import { Schema, model } from "mongoose";

export const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    price: {
      type: Number,
      required: [true, "can't be blank"],
    },
    description: {
      type: String,
      required: [true, "can't be blank"],
    },
    preparation_time: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

export default model("Item", ItemSchema);
