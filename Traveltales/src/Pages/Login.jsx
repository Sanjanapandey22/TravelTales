import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  
  const [mode, setMode] = useState("login"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = { email, password, mode };
    if (mode === "signup") payload.confirmPassword = confirm;

    const res = await axios.post("http://localhost:5000/api/login", payload);

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      navigate("/");
    }

    setMessage(res.data.message);
  } catch (err) {
    setMessage(err.response?.data?.message || "Something went wrong");
  }
};


 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/");
  }
}, [navigate]);


   

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex flex-1 bg-cover bg-center" style={{ backgroundImage: "url('/Login.jpg')" }}>
        <div className="bg-black/20 w-full h-full"></div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-100/40 p-6">
        <div className="w-full max-w-md text-gray-500 rounded-xl shadow p-6">
          <h2 className="text-center text-4xl p-5 text-purple-600 font-bold">Welcome</h2>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{mode === "login" ? "Login" : "Sign Up"}</h2>

          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" className="w-full border rounded-full py-2.5 px-4 mb-3" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder={mode === "login" ? "Password" : "Create Password"} className="w-full border rounded-full py-2.5 px-4 mb-3" value={password} onChange={e => setPassword(e.target.value)} required />
            {mode === "signup" && <input type="password" placeholder="Confirm Password" className="w-full border rounded-full py-2.5 px-4 mb-3" value={confirm} onChange={e => setConfirm(e.target.value)} required />}
            <button type="submit" className="w-full bg-blue-600 py-2.5 rounded-full text-white hover:bg-black transition">{mode === "login" ? "Login" : "Sign Up"}</button>
          </form>

          {message && <p className="text-center mt-2 text-purple-700">{message}</p>}

          <p className="text-center mt-4">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <span className="text-blue-500 underline cursor-pointer" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage('') }}>
              {mode === "login" ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

