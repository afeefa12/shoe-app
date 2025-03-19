// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();


//     // Simple authentication function
//     const handleLogin = async (email, password) => {
//         // This would typically be an API call to your authentication service
//         return new Promise((resolve, reject) => {
//             // Example admin validation - in real app, this would be server-side
//             if (email === 'admin@example.com' && password === '1234') {
//                 resolve('admin');
//             // } else if (email === 'user@example.com' && password === 'user123') {
//             //     resolve('user');
//             } else {
//                 reject(new Error('Invalid email or password'));
//             }
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         try {
//             const role = await handleLogin(email, password);
            
//             // Store authentication info in localStorage instead of context
//             localStorage.setItem('isAuthenticated', 'true');
//             localStorage.setItem('userRole', role);
            
//             // Navigate based on role
//             navigate(role === 'admin' ? '/admin' : '/home');
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
//                 {error && <p className="text-yellow-500 mb-4 text-center bg-red-100 p-2 rounded">{error}</p>}
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="admin@example.com"
//                         className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                         required
//                     />
//                 </div>
//                 <div className="mb-6">
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="•••••••"
//                         className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                         required
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600
//                     cursor-pointer transition-colors duration-200 font-medium"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AdminLogin;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [user, setUser] = useState(() => {
//         return JSON.parse(localStorage.getItem('user')) || null;
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (user) {
//             localStorage.setItem('user', JSON.stringify(user));
//             localStorage.setItem('isAdmin', user.role === 'admin');
//         } else {
//             localStorage.removeItem('user');
//             localStorage.removeItem('isAdmin');
//         }
//     }, [user]);

//     const login = async (email, password) => {
//         try {
//             const response = await fetch(`http://localhost:4000/users?email=${email}`);
//             const users = await response.json();
//             const foundUser = users.find(u => u.password === password && !u.isBlocked && u.isActive !== false);
//             if (foundUser) {
//                 setUser(foundUser);
//                 return foundUser.role;
//             }
//             throw new Error('Invalid credentials');
//         } catch (error) {
//             console.error("Login error:", error);
//             throw new Error("Invalid email or password");
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         try {
//             const role = await login(email, password);
//             navigate(role === 'admin' ? '/AdminSidebar' : '/home');
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
//                 {error && <p className="text-red-500 mb-4 text-center bg-red-100 p-2 rounded">{error}</p>}
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="---"
//                         className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                         required
//                     />
//                 </div>
//                 <div className="mb-6">
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="---"
//                         className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                         required
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600
//                     cursor-pointer transition-colors duration-200 font-medium"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AdminLogin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate admin login (replace with your actual authentication logic)
    const userData = { email, role: "admin" }; // Example user data
    onLogin(userData); // Pass user data to parent
    navigate("/AdminSidebar"); // Navigate to sidebar after login
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
          className="w-full p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
