import { Schema, model } from "mongoose";

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

export default model("Menu", MenuSchema);
