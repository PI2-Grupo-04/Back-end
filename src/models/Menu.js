import { Schema, model } from "mongoose";
import Restaurant from "./Restaurant";

const MenuSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  { timestamps: true }
);

MenuSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    const id = this.getFilter()["id"];
    const restaurant = await Restaurant.findOne({ menus: { _id: id } });
    restaurant.menus = restaurant.menus.filter((item) => item != id);
    restaurant.save();
    next();
  }
);

export default model("Menu", MenuSchema);
