import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: "general" },
  image: { type: String, default: "/default.jpg" },
  author: { type: String, default: "User" },
  createdAt: { type: Date, default: Date.now }
});


const Post = mongoose.model("Post", postSchema);

export default Post;
