import jwt from "jsonwebtoken";
import { Auth } from "../../db/db";

export default async function checkAuthHandler(req, res) {
  const { token } = req.body;
  try {
    const { userId = null } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (userId) {
      const user = await Auth.findById(userId).select({ password: 0 });
      res.status(200).json({ condition: true, user });
    } else {
      res.status(200).json({ condition: false, message: "Jwt Expired" });
    }
  } catch (err) {
    res.status(200).json({ condition: false, message: err.message });
  }
}
