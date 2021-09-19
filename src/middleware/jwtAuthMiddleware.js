import { authenticateToken } from "../services/jwt";
import User from "../models/User";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    const [response] = await authenticateToken(token);
    if (response) {
      const user = await User.findById(response.id);
      req.user = user;
      next();
    }
  }

  return res.status(401).json({
    status: "error",
    data: null,
    message: "Invalid token",
  });
};

export default authMiddleware;
