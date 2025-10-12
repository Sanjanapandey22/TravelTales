import React, { useEffect, useState } from "react";
import BlogCard from "../Pages/BlogCard";
import Nav from "./Nav";

export default function Home({ onEdit, onRead, sortBy, setSortBy }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("blogs") || "[]");
    setBlogs(stored);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const updated = blogs.filter((b) => b.id !== id);
      setBlogs(updated);
      localStorage.setItem("blogs", JSON.stringify(updated));
    }
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

  return (
    <div className="flex flex-col h-full">
      <Nav />
      <div className="p-6">
        <div className="flex justify-between items-center bg-purple-200 py-2 px-4 shadow-sm shadow-gray-400 rounded-xl mb-6">
          <div>
            <h2 className="text-3xl font-semibold">
              Hi, <span className="text-rose-600">User!</span>
            </h2>
            <p className="text-gray-600 mt-5">Welcome back! Ready to share your next story?</p>
          </div>

          <div className="flex items-center gap-4">
            <img src="/Img1.png" width={200} />
            <div className="bg-white p-4 rounded-xl shadow text-center h-20">
              <p className="text-gray-500 text-sm">Total Posts</p>
              <p className="text-2xl font-bold text-purple-600">{blogs.length}</p>
            </div>
          </div>
        </div>

     
        <div className="flex justify-end mb-4 ">
          <select
            value={sortBy}
            
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded shadow-md "
          > 
              <option value="">Sort By </option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title</option>
            <option value="category">Category</option>
           
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBlogs.length === 0 && <p className="text-gray-500">No posts yet.</p>}
          {sortedBlogs.map((b) => (
            <BlogCard
              key={b.id}
              blog={b}
              onEdit={onEdit}
              onRead={onRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
