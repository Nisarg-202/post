import { User } from "../../db/db";

export default async function Handle(req, res) {
  try {
    const { name, email } = req.body;
    const user = new User({ email, name });
    await user.save();
    res.status(200).json({ condition: true });
  } catch (err) {
    console.log(err);
    res.status(200).json({ condition: false });
  }
}
