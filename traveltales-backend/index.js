import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Post from "./models/Post.js";
//import authRoutes from './routes/authRoutes.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./models/user.js";


dotenv.config({path: "./.env"})
const JWT_SECRET = "sanj_super_secret_key";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => res.send(" Server is running!"));

// ----------- POSTS ROUTES -----------
app.post("/api/login", async (req, res) => {
  const { email, password, mode, confirmPassword } = req.body;

  try {
    if (!email || !password) return res.status(400).json({ message: "Fill all fields" });

    if (mode === "signup") {
      if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: "User already exists" });

      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashed });
      await user.save();

      return res.json({ message: "Signup successful!", user });
    }

    if (mode === "login") {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(400).json({ message: "Invalid password" });

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "2h" });
    return res.json({
  success: true,
  message: "Login successful",
  user,
  token
});

    }

    return res.status(400).json({ message: "Invalid mode" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post("/api/posts", async (req, res) => {
    const { title, content, location } = req.body;
    const newPost = new Post({ title, content, location });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.get("/api/posts/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.delete("/api/posts/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" MongoDB connected successfully!"))
    .catch(err => console.error(" MongoDB connection error:", err));

app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
