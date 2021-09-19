import User from "../models/User";
import { generateAccessToken } from "../services/jwt";

class AuthController {
  register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
      await User.create({ username, email, password });
      res.json({
        status: "success",
        data: null,
        message: "Registration Successful",
      });
    } catch (error) {
      res
        .status(401)
        .json({ status: "error", data: null, message: error.message });
    }
  };

  login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        const token = generateAccessToken(user.id);
        return res.json({
          status: "success",
          data: { token },
          message: "Authentication Successful",
        });
      }
    }

    return res.status(400).json({
      status: "error",
      data: null,
      message: "Invalid Credentials",
    });
  };

  authUser = (req, res) => {
    return res.json({
      status: "success",
      data: { user: req.user },
      message: null,
    });
  };
}

export default new AuthController();
