import { Schema, model } from "mongoose";
import Restaurant from "./Restaurant";
import { ItemSchema } from "./Item";

const MenuSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    items: [ItemSchema],
  },
  { timestamps: true }
);

MenuSchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function (next) {
    const id = this.getFilter()["_id"];
    const restaurant = await Restaurant.findOne({ menus: { _id: id } });
    restaurant.menus = restaurant.menus.filter((item) => item != id);
    restaurant.save();
    next();
  }
);

export default model("Menu", MenuSchema);
