import { sign, verify } from "jsonwebtoken";

export const generateAccessToken = (id) => {
  return sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
};

export const authenticateToken = async (token) => {
  try {
    const decoded = await verify(token, process.env.TOKEN_SECRET);
    return [decoded, null];
  } catch (error) {
    return [null, error];
  }
};
