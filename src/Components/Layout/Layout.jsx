import React from "react";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
