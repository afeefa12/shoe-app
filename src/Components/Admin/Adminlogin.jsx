import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
  const adminCredentials = {
    email: "admin@gmail.com",
    password: "1234",
  };

  if (email === adminCredentials.email && password === adminCredentials.password) {
    const userData = { email, role: "admin" };
    onLogin(userData); // Pass user data to parent
    navigate("/Dashboard"); // Navigate to the admin panel
  } else {
    navigate('/')
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-yellow-600 text-white rounded hover:bg-yellow-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
