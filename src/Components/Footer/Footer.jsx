import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 md:mx-0 mx-auto text-center md:text-left">
          <h3 className="font-bold text-2xl">
            Shoe-<span>walk</span>
          </h3>
        </div>

        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-lg mb-3">MENU</h2>
            <ul className="list-none mb-10">
              <li>Features</li>
              <li className="mt-1">Info Center</li>
              <li className="mt-1">News Blog</li>
              <li className="mt-1">Login</li>
            </ul>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-lg mb-3">COMPANY</h2>
            <ul className="list-none mb-10">
              <li>About Us</li>
              <li className="mt-1">Privacy Policy</li>
              <li className="mt-1">Terms & Conditions</li>
              <li className="mt-1">Login</li>
            </ul>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-lg mb-3">CONTACT</h2>
            <ul className="list-none mb-10">
              <li>Contact Sales</li>
              <li className="mt-1">+123456789</li>
              <li className="mt-1">News Blog</li>
              <li className="mt-1">+2345667</li>
            </ul>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-lg mb-3">TECH SUPPORT</h2>
            <ul className="list-none mb-10">
              <li>Contact Support</li>
              <li className="mt-1">Info Center</li>
              <li className="mt-1">Activate</li>
            </ul>
          </div>
        </div>
        </div>
        <div class="bg-gray-500 text-white">
          <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p class ="text-sm text-center sm:text-left">
              2025 Shoe-walk -<span>@copyright</span>
            </p>
            <p class="inline-flex sm:mt-0 mt-2 justify-center sm:justify-start"> 
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />

            </p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
