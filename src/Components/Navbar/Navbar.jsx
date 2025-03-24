
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserLogin = () => {
      const storedUser = localStorage.getItem('user');
      console.log("Stored user data:", storedUser); 
  
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("Parsed user:", parsedUser);
  
          setIsLoggedIn(true);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem('user');
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
  
    checkUserLogin();
    window.addEventListener('storage', checkUserLogin);
    window.addEventListener('userLogin', checkUserLogin);
    return () => {
      window.removeEventListener('storage', checkUserLogin);
      window.removeEventListener('userLogin', checkUserLogin);
    };
  }, []);
  

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(storedCart.reduce((total, item) => total + (item.quantity || 1), 0));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCartCount(0);
      }
    };

    updateCartCount();
  
    window.addEventListener('cartUpdate', updateCartCount);
    window.addEventListener('storage', (event) => {
      if (event.key === 'cart') {
        updateCartCount();
      }
    });

    return () => {
      window.removeEventListener('cartUpdate', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('cart'); 
    setIsLoggedIn(false);
    setUser(null);
    setCartCount(0);
    setDropdownOpen(false);
    navigate("/");
  };

  const ToggleChange = () => {
    setIsOpen(!isOpen);
  };

  const displayName = user?.name ? (user.name.split(' ')[0]) : 'admin';

  return (
    <header className="bg-amber-500 border-b border-gray-200 ">
      <div className="flex justify-between p-5 items-center  top-0 z-50 sticky ">
        <div>
          <Link to="/">
            <h3 className="font-bold text-2xl">Shoe-<span>walk</span></h3>
          </Link>
        </div>
        <div className="hidden md:block">
          <ul className="flex items-center text-lg justify-center font-semibold  ">
            <Link to="/"><li className="mr-5 hover:text-gray-900 cursor-pointer">Home</li></Link>
            <Link to="/products"><li className="mr-5 hover:text-gray-900 cursor-pointer">All Products</li></Link>
            <Link to='/Men'><li className="mr-5 hover:text-gray-900 cursor-pointer">Mens</li></Link>
            <Link to='/Women'><li className="mr-5 hover:text-gray-900 cursor-pointer">Women</li></Link>
          </ul>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-amber-300 text-white flex flex-col items-center justify-center z-20">
            <ul className="text-2xl font-semibold space-y-10">
              <Link to="/" onClick={ToggleChange}><li className="hover:text-gray-900 cursor-pointer">Home</li></Link>
              <Link to="/products" onClick={ToggleChange}><li className="hover:text-gray-900 cursor-pointer">All Products</li></Link>
              <Link to='/Men' onClick={ToggleChange}><li className="hover:text-gray-900 cursor-pointer">Mens</li></Link>
              <Link to="/Women" onClick={ToggleChange}><li className="hover:text-gray-900 cursor-pointer">Women</li></Link>
            </ul>
            <button className="absolute top-5 right-5 text-white" onClick={ToggleChange}><RxCross2 size={30} /></button>
          </div>
        )}
        <div className="flex justify-center items-center gap-3 relative">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button className="bg-black text-white py-2 px-4 rounded-lg font-semibold" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {displayName}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-30">
                  <Link to="/order" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Orders</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base font-semibold">Login</button>
            </Link>
          )}

          <Link to="/cart" className="relative">
            <FaShoppingCart size={25} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>

          <button className="md:hidden z-50 relative" onClick={ToggleChange}>
            {isOpen ? <RxCross2 size={30} /> : <GiHamburgerMenu size={25} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;