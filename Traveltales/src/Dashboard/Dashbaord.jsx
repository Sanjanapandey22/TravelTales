import React, { useState } from "react";
import { FaPlus, FaCog, FaHome } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import Home from "./Home";
import BlogInput from "../Pages/BlogInput";
import ReadBlog from "../Pages/ReadBlog";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("home"); 
  const [readBlog, setReadBlog] = useState(null); 
  const [editBlog, setEditBlog] = useState(null); 
  const [sortBy, setSortBy] = useState(""); // default

  const handleEdit = (blog) => {
    setEditBlog(blog);
    setActivePage("create");
  };

  const handleRead = (blog) => {
    setReadBlog(blog);
    setActivePage("read");
  };

  const handleBack = () => {
    setReadBlog(null);
    setEditBlog(null);
    setActivePage("home");
  };

  const sidebarItems = [
    { name: "Home", icon: <FaHome />, action: () => setActivePage("home") },
    { name: "Create Post", icon: <FaPlus />, action: () => setActivePage("create") },
    { name: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col p-6">
        <h2 className="text-3xl font-bold mb-12 mt-7">
          <span className="text-rose-600">Travel</span>
          <span className="text-purple-400">Tales</span>
        </h2>

        <div className="flex flex-col gap-8">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`flex items-center gap-4 py-2 px-4 rounded-lg transition-all duration-200 ${
                item.name === "Create Post"
                  ? "bg-rose-500 text-white hover:bg-rose-600 font-medium shadow-sm"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto text-gray-400 text-sm">
          <p className="mt-10 border-t pt-4">© 2025 TravelTales</p>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 p-6 bg-gradient-to-b from-gray-100 via-white to-gray-200">
        {activePage === "home" && (
          <Home
            onEdit={handleEdit}
            onRead={handleRead}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        )}
        {activePage === "create" && <BlogInput editBlog={editBlog} onBack={handleBack} />}
        {activePage === "read" && <ReadBlog blog={readBlog} onBack={handleBack} />}
      </main>
    </div>
  );
}
