import { Schema, model } from "mongoose";
import User from "./User";

const RestaurantSchema = new Schema(
  {
    name: String,
    menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
  },
  { timestamps: true }
);

RestaurantSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    const id = this.getFilter()["id"];
    const user = await User.findOne({ restaurants: { _id: id } });
    user.restaurants = user.restaurants.filter((item) => item != id);
    user.save()
    next();
  }
);

export default model("Restaurant", RestaurantSchema);
