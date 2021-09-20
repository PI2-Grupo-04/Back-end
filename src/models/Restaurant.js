import { Schema, model } from "mongoose";

const RestaurantSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

export default model("Restaurant", RestaurantSchema);
