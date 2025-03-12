// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaShoppingCart } from 'react-icons/fa';
// import { GiHamburgerMenu } from 'react-icons/gi';
// import { RxCross2 } from 'react-icons/rx';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const ToggleChange = () => {
//     isOpen === false?setIsOpen(true): setIsOpen(false);
//   };

//   return (
//     <header className="bg-amber-500 border-b border-gray-200">
//       <div className=" flex justify-between p-5 items-center">
//         <div>
//           <Link to="/">
//             <h3 className="font-bold text-2xl">
//               Shoe-<span>walk</span>
//             </h3>
//           </Link>
//         </div>
        
//         {/* Desktop Menu */}
//         <div className="hidden md:block">
//           <ul className="flex items-center text-lg justify-center font-semibold">
//             <Link to="/">
//               <li className="mr-5 hover:text-gray-900 cursor-pointer">Home</li>
//             </Link>
//             <Link  to="/allproducts">
//             <li className="mr-5 hover:text-gray-900 cursor-pointer">All Products</li>
//             </Link>
//             <li className="mr-5 hover:text-gray-900 cursor-pointer">Mens</li>
//             <li className="mr-5 hover:text-gray-900 cursor-pointer">Women</li>
//           </ul>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="fixed inset-0 bg-amber-300 text-white flex flex-col items-center justify-center z-20">
//             <ul className="text-2xl font-semibold space-y-10">
//               <Link to="/">
//                 <li className="hover:text-gray-900 cursor-pointer">Home</li>
//               </Link>
               
//               <li className="hover:text-gray-900 cursor-pointer">All Products</li>
              
              
//               <li className="hover:text-gray-900 cursor-pointer">Mens</li>
//               <li className="hover:text-gray-900 cursor-pointer">Women</li>
//             </ul>
//             <button className="absolute top-5 right-5 text-white" onClick={ToggleChange}>
//               <RxCross2 size={30} />
//             </button>
//           </div>
//         )}
        
//         <div className="flex justify-center items-center gap-3">
//           <Link to='/Login'>
//           <button className="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base font-semibold">
//             Login
//           </button>
//           </Link>

//           <Link to="/Cart">
//             <button>
//               <FaShoppingCart size={25} />
//             </button>
//           </Link>
//           <button className="md:hidden z-50 relative" onClick={ToggleChange}>
//     <GiHamburgerMenu size={25} />
// </button>

//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;
 

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaShoppingCart } from 'react-icons/fa';
// import { GiHamburgerMenu } from 'react-icons/gi';
// import { RxCross2 } from 'react-icons/rx';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const ToggleChange = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   return (
//     <header className="bg-amber-500 border-b border-gray-200">
//       <div className="flex justify-between p-5 items-center">
//         <div>
//           <Link to="/">
//             <h3 className="font-bold text-2xl">
//               Shoe-<span>walk</span>
//             </h3>
//           </Link>
//         </div>
        
//         {/* Desktop Menu */}
//         <div className="hidden md:block">
//           <ul className="flex items-center text-lg justify-center font-semibold">
//             <Link to="/">
//               <li className="mr-5 hover:text-gray-900 cursor-pointer">Home</li>
//             </Link>
//             <Link to="/allproducts">
//               <li className="mr-5 hover:text-gray-900 cursor-pointer">All Products</li>
//             </Link>
//             <li className="mr-5 hover:text-gray-900 cursor-pointer">Mens</li>
//             <li className="mr-5 hover:text-gray-900 cursor-pointer">Women</li>
//           </ul>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="fixed inset-0 bg-amber-300 text-white flex flex-col items-center justify-center z-20">
//             <ul className="text-2xl font-semibold space-y-10">
//               <Link to="/">
//                 <li className="hover:text-gray-900 cursor-pointer">Home</li>
//               </Link>
//               <li className="hover:text-gray-900 cursor-pointer">All Products</li>
//               <li className="hover:text-gray-900 cursor-pointer">Mens</li>
//               <li className="hover:text-gray-900 cursor-pointer">Women</li>
//             </ul>
//             <button className="absolute top-5 right-5 text-white" onClick={ToggleChange}>
//               <RxCross2 size={30} />
//             </button>
//           </div>
//         )}
        
//         <div className="flex justify-center items-center gap-3 relative">
//           {user ? (
//             <div className="relative">
//               <button 
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
//                 className="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base font-semibold">
//                 {user.name}
//               </button>
//               {isDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
//                   <Link to="/order-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Order Details</Link>
//                   <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link to='/login'>
//               <button className="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base font-semibold">
//                 Login
//               </button>
//             </Link>
//           )}
          
//           <Link to="/cart">
//             <button>
//               <FaShoppingCart size={25} />
//             </button>
//           </Link>
          
//           <button className="md:hidden z-50 relative" onClick={ToggleChange}>
//             <GiHamburgerMenu size={25} />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaShoppingCart } from 'react-icons/fa';
// import { GiHamburgerMenu } from 'react-icons/gi';
// import { RxCross2 } from 'react-icons/rx';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(3); // Replace with dynamic cart count

//   useEffect(() => {
//     // Check if user is logged in from localStorage
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setIsLoggedIn(true);
//       setUser(storedUser);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setIsLoggedIn(false);
//     setUser(null);
//     setDropdownOpen(false);
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const ToggleChange = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <header className="bg-amber-500 border-b border-gray-200">
//       <div className="flex justify-between p-5 items-center">
//         {/* Logo */}
//         <div>
//           <Link to="/">
//             <h3 className="font-bold text-2xl">
//               Shoe-<span>walk</span>
//             </h3>
//           </Link>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:block">
//           <ul className="flex items-center text-lg justify-center font-semibold">
//             <Link to="/">
//               <li className="mr-5 hover:text-gray-900 cursor-pointer">Home</li>
//             </Link>
//             <Link to="/allproducts">
//               <li className="mr-5 hover:text-gray-900 cursor-pointer">All Products</li>
//             </Link>
//             <li className="mr-5 hover:text-gray-900 cursor-pointer">Mens</li>
//             <li className="mr-5 hover:text-gray-900 cursor-pointer">Women</li>
//           </ul>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="fixed inset-0 bg-amber-300 text-white flex flex-col items-center justify-center z-20">
//             <ul className="text-2xl font-semibold space-y-10">
//               <Link to="/">
//                 <li className="hover:text-gray-900 cursor-pointer">Home</li>
//               </Link>
//               <Link to="/allproducts">
//                 <li className="hover:text-gray-900 cursor-pointer">All Products</li>
//               </Link>
//               <li className="hover:text-gray-900 cursor-pointer">Mens</li>
//               <li className="hover:text-gray-900 cursor-pointer">Women</li>
//             </ul>
//             <button className="absolute top-5 right-5 text-white" onClick={ToggleChange}>
//               <RxCross2 size={30} />
//             </button>
//           </div>
//         )}

//         {/* Right Section: User Dropdown & Cart */}
//         <div className="flex items-center gap-4">
//           {isLoggedIn ? (
//             <div className="relative">
//               <button
//                 onClick={toggleDropdown}
//                 className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700"
//               >
//                 {user?.name || "User"}
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
//                   <Link
//                     to="/orders"
//                     className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
//                     onClick={() => setDropdownOpen(false)}
//                   >
//                     Order Details
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link to="/login">
//               <button className="bg-yellow-300 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-400">
//                 Login
//               </button>
//             </Link>
//           )}

//           {/* Cart Icon with Count */}
//           <Link to="/cart">
//             <button className="relative">
//               <FaShoppingCart size={25} className="text-white" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   {cartCount}
//                 </span>
//               )}
//             </button>
//           </Link>

//           {/* Mobile Menu Toggle Button */}
//           <button className="md:hidden text-white" onClick={ToggleChange}>
//             {isOpen ? <RxCross2 size={30} /> : <GiHamburgerMenu size={25} />}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaShoppingCart } from 'react-icons/fa';
// import { GiHamburgerMenu } from 'react-icons/gi';
// import { RxCross2 } from 'react-icons/rx';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check if user is logged in from localStorage
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setIsLoggedIn(true);
//       setUser(storedUser);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   const ToggleChange = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <header className="bg-amber-500 border-b border-gray-200">
//       <div className="flex justify-between p-5 items-center">
//         {/* Logo */}
//         <div>
//           <Link to="/">
//             <h3 className="font-bold text-2xl">
//               Shoe-<span>walk</span>
//             </h3>
//           </Link>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:block">
//           <ul className="flex items-center text-lg justify-center font-semibold">
//             <Link to="/">
//               <li className="mr-5 hover:text-gray-900 cursor-pointer">Home</li>
//             </Link>
//             <Link to="/allproducts">
//               <li className="mr-5 hover:text-gray-900 cursor-pointer">All Products</li>
//             </Link>
//             <li className="mr-5 hover:text-gray-900 cursor-pointer">Mens</li>
//             <li className="mr-5 hover:text-gray-900 cursor-pointer">Women</li>
//           </ul>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="fixed inset-0 bg-amber-300 text-white flex flex-col items-center justify-center z-20">
//             <ul className="text-2xl font-semibold space-y-10">
//               <Link to="/" onClick={ToggleChange}>
//                 <li className="hover:text-gray-900 cursor-pointer">Home</li>
//               </Link>
//               <Link to="/allproducts" onClick={ToggleChange}>
//                 <li className="hover:text-gray-900 cursor-pointer">All Products</li>
//               </Link>
//               <li className="hover:text-gray-900 cursor-pointer">Mens</li>
//               <li className="hover:text-gray-900 cursor-pointer">Women</li>
//             </ul>
//             <button className="absolute top-5 right-5 text-white" onClick={ToggleChange}>
//               <RxCross2 size={30} />
//             </button>
//           </div>
//         )}

//         {/* User Section & Cart */}
//         <div className="flex justify-center items-center gap-3">
//           {isLoggedIn ? (
//             <div className="relative">
//               <button className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold">
//                 {user?.name || "User"}
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="ml-2 bg-red-500 text-white py-2 px-3 rounded-lg font-semibold hover:bg-red-700"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <Link to="/login">
//               <button className="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base font-semibold">
//                 Login
//               </button>
//             </Link>
//           )}

//           <Link to="/cart">
//             <button>
//               <FaShoppingCart size={25} />
//             </button>
//           </Link>

//           <button className="md:hidden z-50 relative" onClick={ToggleChange}>
//             {isOpen ? <RxCross2 size={30} /> : <GiHamburgerMenu size={25} />}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import "./Navbar.css";
import Search from "./Search";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("rememberedEmail");
    setUserName("");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img
          src="https://websitedemos.net/baby-store-04/wp-content/uploads/sites/750/2020/12/baby-store-logo.svg"
          alt="Baby Store Logo"
          className="logo"
        />
        <div className="store-name">Baby Store</div>
      </div>

      <ul className="nav-links">
        <li>
          <Search />
        </li>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/productlist" className="nav-link">
            Products
          </Link>
        </li>
        <li>
          <Link to="/cart" className="nav-link">
            <MdOutlineShoppingCartCheckout />
          </Link>
        </li>
        <li className="nav-link">
          {userName ? (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <select
                style={{ border: "none", background: "none", cursor: "pointer" }}
                onChange={(e) => {
                  if (e.target.value === "logout") {
                    handleLogout();
                  }
                }}


              >
                
                <option onClick={() =>{ navigate('/login')}} value="">{userName}</option>
                
                <option value="logout">Log Out</option>
              </select>
            </div>
          ) : (
            <Link to="/login">
              <FaUserCircle />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;


