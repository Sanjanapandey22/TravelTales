import React from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    localStorage.removeItem("token");
  
    navigate("/login");
  };

  const handleProfileClick = () => {

    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-5 ml-6 bg-white shadow-md">
      <h2 className="text-2xl text-gray-700 font-semibold">Dashboard</h2>

      <div className="flex items-center gap-6">
        <button onClick={handleProfileClick}>
          <FaUser className="text-2xl text-purple-400" />
        </button>
        <button
          onClick={handleLogout}
          className="bg-rose-500 text-white font-medium rounded-full py-2 px-5 hover:bg-rose-600 transition"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}
