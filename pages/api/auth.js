import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Auth } from "../../db/db";

function GenerateJwtToken(id) {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY);
}

async function HashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function ComparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export default async function AuthHandler(req, res) {
  const { email, password } = req.body;
  if (req.body.condition) {
    try {
      const hashedPassword = await HashPassword(password);
      const user = new Auth({ email, password: hashedPassword });
      await user.save();
      const token = GenerateJwtToken(user._id);
      res.status(200).json({ condition: true, token });
    } catch (err) {
      res.status(200).json({ condition: false, message: err.message });
    }
  } else {
    try {
      const user = await Auth.findOne({ email });
      if (user) {
        const result = await ComparePassword(password, user.password);
        if (result) {
          const token = GenerateJwtToken(user._id);
          res.status(200).json({ condition: true, token });
        } else {
          res
            .status(200)
            .json({ condition: false, message: "Incorrect Password!" });
        }
      } else {
        res.status(200).json({ condition: false, message: "User not Found!!" });
      }
    } catch (err) {
      res.status(200).json({ condition: false, message: err.message });
    }
  }
}
