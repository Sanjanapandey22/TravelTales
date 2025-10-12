import React from "react";
import Nav from "../Dashboard/Nav";
import { blogCategories } from "./blogConfig";

export default function ReadBlog({ blog, onBack }) {
  if (!blog) return <p>Blog not found!</p>;

  const cat = blogCategories[blog.category] || { color: "bg-gray-200 text-gray-700", image: "/default.jpg" };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
      const updated = blogs.filter(b => b.id !== blog.id);
      localStorage.setItem("blogs", JSON.stringify(updated));
      onBack();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />
      <div className="p-6 max-w-4xl mx-auto">
        <img src={cat.image} alt={blog.category} className="w-full h-64 object-cover rounded mb-6"/>
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <div className="flex items-center gap-4 mb-6 text-gray-500">
          <span className={`px-3 py-1 rounded text-sm ${cat.color}`}>{blog.category}</span>
          <span>By {blog.author || "User"}</span>
          <span>{blog.createdAt || "Unknown date"}</span>
        </div>
        <div className="text-gray-700 whitespace-pre-line text-lg" dangerouslySetInnerHTML={{ __html: blog.content }} />
        <div className="flex gap-4 justify-end mt-6">
          <button onClick={onBack} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Back</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}
