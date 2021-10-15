import { Schema, model } from "mongoose";
import { ItemSchema } from "./Item";

const OrderSchema = new Schema({
  notes: { type: String },
  items: [ItemSchema],
  status: {
    type: String,
    enum: ["Awaiting", "Cancelled", "Confirmed", "Rejected"],
    default: "Awaiting",
  },
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
});

export default model("Order", OrderSchema);
