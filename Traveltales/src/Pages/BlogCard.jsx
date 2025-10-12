import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { blogCategories } from "./blogConfig";

export default function BlogCard({ blog, onRead, onEdit, onDelete }) {
  const catKey = blog.category?.toLowerCase();
  const cat = blogCategories[catKey] || { color: "bg-gray-200 text-gray-700", image: "/default.jpg" };

  return (
    <div className="p-4 rounded-xl bg-gray-50 shadow hover:shadow-md">
      <img src={cat.image} alt={blog.category} className="w-full h-40 object-cover rounded mb-4" />
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{blog.title}</h3>
        {blog.category && <span className={`px-2 py-1 rounded ${cat.color}`}>{blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}</span>}
      </div>
      <div className="text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.content }} />
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={() => onRead(blog)} className="text-blue-500 hover:text-blue-600"><FaEye /></button>
        <button onClick={() => onEdit(blog)} className="text-yellow-500 hover:text-yellow-600"><FaEdit /></button>
        <button onClick={() => onDelete(blog.id)} className="text-red-500 hover:text-red-600"><FaTrash /></button>
      </div>
    </div>
  );
}

