// import React from "react";
// import Navbar from "../Navbar/Navbar";
// import { useLocation } from "react-router-dom"; 

// const Layout = ({ children }) => {
//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith('/admin'); 

//   return (
//     <div className="layout-container">
//       {!isAdminRoute && <Navbar />} {/* Render Navbar only if not on admin route */}
//       <main>{children}</main>
//     </div>
//   );
// };

// export default Layout;

import React from "react";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children, isAdmin = false }) => {
  return (
    <div className="layout-container">
      {!isAdmin && <Navbar />} {/* Navbar hidden if isAdmin is true */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;