import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { blogCategories } from "./blogConfig";
import Nav from "../Dashboard/Nav";
import BlogCard from "./BlogCard";

export default function BlogInput({ editBlog, onBack }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [blogs, setBlogs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("blogs") || "[]"); } catch { return []; }
  });
  const [sortBy, setSortBy] = useState("newest"); 

  const [editingId, setEditingId] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  const normalize = (post) => {
    const catKey = (post.category || "").toLowerCase();
    return {
      id: post._id || post.id || String(Date.now()),
      title: post.title || "",
      content: post.content || "",
      category: catKey,
      image: post.image || blogCategories[catKey]?.image || "/default.jpg",
      author: post.author || "User",
      createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString(),
    };
  };

const sortedBlogs = [...blogs].sort((a, b) => {
  switch (sortBy) {
    case "newest":
      return new Date(b.createdAt) - new Date(a.createdAt);
    case "oldest":
      return new Date(a.createdAt) - new Date(b.createdAt);
    case "title":
      return a.title.localeCompare(b.title);
    case "category":
      return a.category.localeCompare(b.category);
    default:
      return 0;
  }
});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/posts`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        const normalized = data.map(normalize);
        setBlogs(normalized);
        localStorage.setItem("blogs", JSON.stringify(normalized));
      } catch (err) {
        console.warn("Could not load posts from server, fallback to localStorage", err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (editBlog) {
      setTitle(editBlog.title || "");
      setContent(editBlog.content || "");
      setCategory(editBlog.category || "");
      setEditingId(editBlog.id || null);
    }
  }, [editBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) return alert("Fill all fields!");

    const catKey = category.toLowerCase();
    const payload = {
      title,
      content,
      category: catKey,
      image: blogCategories[catKey]?.image || "/default.jpg",
      author: "User",
      createdAt: new Date().toISOString(),
    };

    try {
      let savedPost;
      if (editingId) {
        const res = await fetch(`${API}/posts/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update post");
        savedPost = await res.json();
      } else {
        const res = await fetch(`${API}/posts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to save blog");
        savedPost = await res.json();
      }

      const normalized = normalize(savedPost);
      const updatedBlogs = editingId
        ? blogs.map(b => (b.id === normalized.id ? normalized : b))
        : [normalized, ...blogs];

      setBlogs(updatedBlogs);
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

      setTitle(""); setContent(""); setCategory(""); setEditingId(null);
      onBack();
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog!");
    }
  };

  const handleDelete = async (idToDelete) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`${API}/posts/${idToDelete}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      const remaining = blogs.filter(b => b.id !== idToDelete);
      setBlogs(remaining);
      localStorage.setItem("blogs", JSON.stringify(remaining));
    } catch (err) {
      console.error("Delete error", err);
      alert("Failed to delete post.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Nav />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">{editingId ? "Edit Blog" : "Create Blog"}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 bg-white rounded"/>
          <Editor
            apiKey="YOUR_TINY_API_KEY"
            value={content}
            onEditorChange={setContent}
            init={{ height: 400, menubar: true, plugins: ['advlist autolink lists link image charmap print preview anchor','searchreplace visualblocks code fullscreen','insertdatetime media table paste code help wordcount'], toolbar:'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help' }}
          />
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-white p-2 rounded">
            <option value="">Select Category</option>
            {Object.keys(blogCategories).map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
          <button type="submit" className="w-full py-2 bg-purple-500 text-white rounded hover:bg-purple-600">{editingId ? "Update Blog" : "Add Blog"}</button>
        </form>

        <div className="mt-8 space-y-4">
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} 
              onRead={() => {}}
              onEdit={(b) => { setEditingId(b.id); setTitle(b.title); setContent(b.content); setCategory(b.category); window.scrollTo(0,0); }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
