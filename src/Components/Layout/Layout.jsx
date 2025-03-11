import React from "react";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {/* Common layout elements like navbar or footer can go here */}
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
