import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch users from JSON Server
      const res = await fetch(`http://localhost:4000/users?email=${email}&password=${password}`);
      const users = await res.json();

      if (users.length > 0) {
        const user = users[0];
        localStorage.setItem("userId", user.id);
        navigate("/"); // Redirect to Home page
    
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600 text-sm">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline" 
          onClick={()=>
            navigate('/signup')
          }
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Check if the user is already logged in when the component mounts
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   // Handle Login
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Fetch users from JSON Server
//       const res = await fetch(`http://localhost:4000/users?email=${email}&password=${password}`);
//       const users = await res.json();

//       if (users.length > 0) {
//         const loggedInUser = users[0];
//         localStorage.setItem("user", JSON.stringify(loggedInUser)); // Store user data
//         setUser(loggedInUser); // Update state
//         navigate("/"); // Redirect to Home page
//       } else {
//         alert("Invalid Credentials");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("user"); // Remove user data
//     setUser(null);
//     navigate("/login"); // Redirect to Login page
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
//         {/* Show Login Form if No User is Logged In */}
//         {!user ? (
//           <>
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Email Input */}
//               <div>
//                 <label className="block text-gray-700 font-medium">Email</label>
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   required
//                 />
//               </div>

//               {/* Password Input */}
//               <div>
//                 <label className="block text-gray-700 font-medium">Password</label>
//                 <input
//                   type="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   required
//                 />
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex justify-between items-center">
//                 <label className="flex items-center">
//                   <input type="checkbox" className="mr-2" />
//                   <span className="text-gray-600 text-sm">Remember me</span>
//                 </label>
//                 <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//               >
//                 Login
//               </button>
//             </form>

//             {/* Signup Link */}
//             <p className="text-center text-gray-600 text-sm mt-4">
//               Don't have an account?{" "}
//               <Link to="/signup" className="text-blue-500 hover:underline">
//                 Sign up
//               </Link>
//             </p>
//           </>
//         ) : (
//           // If User is Logged In, Show Username and Logout Button
//           <>
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//               Welcome, {user.name}
//             </h2>
//             <button
//               onClick={handleLogout}
//               className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
