import { Schema, model } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      unique: true,
    },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  const match = await compare(password, this.password);
  return match;
};

export default model("User", UserSchema);
