import mongoose from "mongoose";

mongoose.connect(
  `mongodb+srv://nisarg:${process.env.MONGOOSE_PASSWORD}@cluster0.x2a77.mongodb.net/postDB`
);

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

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

let User, Auth;

try {
  User = mongoose.model("User");
} catch (err) {
  User = mongoose.model("User", userSchema);
}

try {
  Auth = mongoose.model("Auth");
} catch (err) {
  Auth = mongoose.model("Auth", authSchema);
}

export { User, Auth };
