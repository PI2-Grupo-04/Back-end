import { Schema, model } from "mongoose";

const RestaurantSchema = new Schema(
  {
    name: String,
    menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
  },
  { timestamps: true }
);

export default model("Restaurant", RestaurantSchema);
