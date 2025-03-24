import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";

const HamburgerIcon = ({ isOpen, toggle }) => (
  <button
    onClick={toggle}
    className="focus:outline-none p-2"
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    {isOpen ? (
      <FaTimes className="w-6 h-6 text-yellow-700" />
    ) : (
      <FaBars className="w-6 h-6 text-yellow-700" />
    )}
  </button>
);

const AdminSidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("AdminSidebar - User:", user, "Path:", location.pathname);
    if (!user) {
      console.log("No user found in sidebar, redirecting...");
      navigate("/adminlogin"); 
    }
  }, [user, location.pathname, navigate]);

  const handleLogout = () => {
    console.log("Logout triggered");
    localStorage.removeItem("user")  
    navigate("/"); 
    logout(); 
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { to: "/Dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/admin/Products", icon: <FaBox />, label: "Products" },
    { to: "/admin/orders", icon: <FaShoppingCart />, label: "Orders" },
    { to: "/admin/users", icon: <FaUsers />, label: "Users" },
  ];

  if (!user || user.role !== "admin") {
    console.log("Sidebar not rendered - User:", user);
    return null;
  }

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50 bg-white rounded-full shadow-md flex items-center justify-center w-12 h-12">
        <HamburgerIcon isOpen={isOpen} toggle={toggleSidebar} />
      </div>
      <div
        className={`fixed top-0 left-0 w-72 h-screen bg-yellow-600 text-gray-800 p-6 flex flex-col shadow-xl transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-72`}
      >
        <div className="flex-shrink-0">
          <h2 className="text-2xl font-extrabold mb-8 pb-4 border-b border-yellow-600 tracking-wide text-center text-gray-900">
            Admin Panel
          </h2>
        </div>
        <nav className="space-y-2 flex-1">
          {menuItems.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ease-in-out
                ${
                  location.pathname === to
                    ? "bg-yellow-400 text-gray-900"
                    : "text-gray-700 hover:bg-yellow-400/80 hover:text-gray-900"
                }`}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsOpen(false);
                }
              }}
            >
              <span className="text-xl">{icon}</span>
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 bg-yellow-600 hover:bg-yellow-900 rounded-lg transition-all duration-200 ease-in-out font-semibold text-white shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default AdminSidebar;