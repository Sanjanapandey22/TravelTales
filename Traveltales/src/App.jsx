import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashbaord";
import Home from "./Dashboard/Home";
import BlogInput from "./Pages/BlogInput";
import ReadBlog from "./Pages/BlogCard";
import Login from "./Pages/Login"

export default function App() {
  return (
    <Router>
    
        <Routes>
          <Route path="/"  element= {<Dashboard/>} />
          <Route path="/create" element={<><Dashboard/><BlogInput /></>} />
          <Route path="/read" element={<ReadBlog />} />
          <Route path="/login" element={<Login />} />
        
        </Routes>
    
    </Router>
  );
}
