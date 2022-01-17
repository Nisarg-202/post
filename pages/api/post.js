import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/postDB");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

let User;

try {
  User = mongoose.model("User");
} catch (err) {
  User = mongoose.model("User", userSchema);
}

export default async function Handle(req, res) {
  try {
    const { name, email } = req.body;
    const user = new User({ email, name });
    await user.save();
    res.status(200).json({ condition: true });
  } catch (err) {
    res.status(200).json({ condition: false });
  }
}
