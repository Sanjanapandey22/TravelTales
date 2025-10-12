import React from "react";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { blogCategories } from "./blogConfig";

export default function BlogModal({ blog, onClose, onEdit, onDelete }) {
  if (!blog) return null;

  const category = blogCategories[blog.category] || {};

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{blog.title}</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-500 hover:text-gray-700" size={20} />
          </button>
        </div>

        {category.image && (
          <img
            src={category.image}
            alt={blog.category}
            className="w-full h-60 object-cover rounded mb-4"
          />
        )}

        {blog.category && (
          <span className={`inline-block mb-4 px-3 py-1 rounded ${category.color}`}>
            {blog.category}
          </span>
        )}

        <p className="text-gray-700 mb-6 whitespace-pre-line">{blog.content}</p>

        <div className="flex gap-4 justify-end">
          <button
            onClick={() => onEdit(blog)}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={() => onDelete(blog.id)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
