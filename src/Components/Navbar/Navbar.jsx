import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const ToggleChange = () => {
    isOpen === false?setIsOpen(true): setIsOpen(false);
  };

  return (
    <header className="bg-amber-500 border-b border-gray-200">
      <div className=" flex justify-between p-5 items-center">
        <div>
          <Link to="/">
            <h3 className="font-bold text-2xl">
              Shoe-<span>walk</span>
            </h3>
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="flex items-center text-lg justify-center font-semibold">
            <Link to="/">
              <li className="mr-5 hover:text-gray-900 cursor-pointer">Home</li>
            </Link>
            <Link  to="/allproducts">
            <li className="mr-5 hover:text-gray-900 cursor-pointer">All Products</li>
            </Link>
            <li className="mr-5 hover:text-gray-900 cursor-pointer">Mens</li>
            <li className="mr-5 hover:text-gray-900 cursor-pointer">Kids</li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 bg-amber-300 text-white flex flex-col items-center justify-center z-20">
            <ul className="text-2xl font-semibold space-y-10">
              <Link to="/">
                <li className="hover:text-gray-900 cursor-pointer">Home</li>
              </Link>
               
              <li className="hover:text-gray-900 cursor-pointer">All Products</li>
              
              
              <li className="hover:text-gray-900 cursor-pointer">Mens</li>
              <li className="hover:text-gray-900 cursor-pointer">Kids</li>
            </ul>
            <button className="absolute top-5 right-5 text-white" onClick={ToggleChange}>
              <RxCross2 size={30} />
            </button>
          </div>
        )}
        
        <div className="flex justify-center items-center gap-3">
          <Link to='/Login'>
          <button className="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base font-semibold">
            Login
          </button>
          </Link>

          <Link to="/Cart">
            <button>
              <FaShoppingCart size={25} />
            </button>
          </Link>
          <button className="md:hidden z-50 relative" onClick={ToggleChange}>
    <GiHamburgerMenu size={25} />
</button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
