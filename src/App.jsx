// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home/Home";
// import Cart from "./pages/Cart/Carts";
// import "./App.css";
// import Login from "./pages/Login/Login";
// import Layout from "./Components/Layout/Layout";
// import Signup from "./pages/SignUp/SignUp";
// import ProductList from "./Components/Allproducts/Allproducts";
// import Payment from "./Components/Payment/Payment";
// import ProductDetails from "./Components/Allproducts/ProductDetails";
// import Women from "./pages/Women/Women";
// import Men from "./pages/Men/Men";
// import Order from "./Components/order";
// import AdminLogin from "./Components/Admin/Adminlogin";
// import AdminSidebar from "./Components/Admin/Sidebar";




// function App() {
//   return (
//     <BrowserRouter>
//       <Layout>
//       <Routes>
//         <Route path="/" element={<Home/>} />
//         <Route path="/cart" element={<Cart/>} />
//         <Route path="/products" element={<ProductList/>} />
//         <Route path="/Login" element={<Login/>} />
//         <Route path="/signup" element={<Signup/>}/>
//         <Route path="/Payment" element={<Payment/>}/>
//         <Route path="/product/:productId" element={<ProductDetails/>}/>
//         <Route path="/Women" element={<Women/>}/>
//         <Route path="/Men" element={<Men/>}/>
//         <Route path="/order" element={<Order/>}/>



//         {/* Admin  */}
//         <Route path="/adminlogin" element={<AdminLogin/>}/>
//         <Route path="/AdminSidebar" element={<AdminSidebar/>}/>






//       </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// }

// export default App;


// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home/Home";
// import Cart from "./pages/Cart/Carts";
// import "./App.css";
// import Login from "./pages/Login/Login";
// import Layout from "./Components/Layout/Layout";
// import Signup from "./pages/SignUp/SignUp";
// import ProductList from "./Components/Allproducts/Allproducts";
// import Payment from "./Components/Payment/Payment";
// import ProductDetails from "./Components/Allproducts/ProductDetails";
// import Women from "./pages/Women/Women";
// import Men from "./pages/Men/Men";
// import Order from "./Components/order";
// import AdminLogin from "./Components/Admin/Adminlogin";
// import AdminSidebar from "./Components/Admin/Sidebar";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Regular routes with Navbar */}
//         <Route
//           path="/"
//           element={
//             <Layout>
//               <Home />
//             </Layout>
//           }
//         />
//         <Route
//           path="/cart"
//           element={
//             <Layout>
//               <Cart />
//             </Layout>
//           }
//         />
//         <Route
//           path="/products"
//           element={
//             <Layout>
//               <ProductList />
//             </Layout>
//           }
//         />
//         <Route
//           path="/Login"
//           element={
//             <Layout>
//               <Login />
//             </Layout>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <Layout>
//               <Signup />
//             </Layout>
//           }
//         />
//         <Route
//           path="/Payment"
//           element={
//             <Layout>
//               <Payment />
//             </Layout>
//           }
//         />
//         <Route
//           path="/product/:productId"
//           element={
//             <Layout>
//               <ProductDetails />
//             </Layout>
//           }
//         />
//         <Route
//           path="/Women"
//           element={
//             <Layout>
//               <Women />
//             </Layout>
//           }
//         />
//         <Route
//           path="/Men"
//           element={
//             <Layout>
//               <Men />
//             </Layout>
//           }
//         />
//         <Route
//           path="/order"
//           element={
//             <Layout>
//               <Order />
//             </Layout>
//           }
//         />

//         {/* Admin routes without Navbar */}
//         <Route
//           path="/adminlogin"
//           element={
//             <Layout isAdmin={true}>
//               <AdminLogin />
//             </Layout>
//           }
//         />
//         <Route
//           path="/AdminSidebar"
//           element={
//             <Layout isAdmin={true}>
//               <AdminSidebar />
//             </Layout>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Carts";
import "./App.css";
import Login from "./pages/Login/Login";
import Layout from "./Components/Layout/Layout";
import Signup from "./pages/SignUp/SignUp";
import ProductList from "./Components/Allproducts/Allproducts";
import Payment from "./Components/Payment/Payment";
import ProductDetails from "./Components/Allproducts/ProductDetails";
import Women from "./pages/Women/Women";
import Men from "./pages/Men/Men";
import Order from "./Components/order";
import AdminLogin from "./Components/Admin/Adminlogin";
import AdminSidebar from "./Components/Admin/Sidebar";

function App() {
  const [user, setUser] = useState(null); // Manage user state

  const handleLogin = (userData) => {
    setUser(userData); // Set user after login
  };

  const handleLogout = () => {
    setUser(null); // Clear user on logout
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Regular routes with Navbar */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <ProductList />
            </Layout>
          }
        />
        <Route
          path="/Login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />
        <Route
          path="/Payment"
          element={
            <Layout>
              <Payment />
            </Layout>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />
        <Route
          path="/Women"
          element={
            <Layout>
              <Women />
            </Layout>
          }
        />
        <Route
          path="/Men"
          element={
            <Layout>
              <Men />
            </Layout>
          }
        />
        <Route
          path="/order"
          element={
            <Layout>
              <Order />
            </Layout>
          }
        />

        {/* Admin routes without Navbar */}
        <Route
          path="/adminlogin"
          element={
            <Layout isAdmin={true}>
              <AdminLogin onLogin={handleLogin} />
            </Layout>
          }
        />
        <Route
          path="/AdminSidebar"
          element={
            <Layout isAdmin={true}>
              <AdminSidebar user={user} logout={handleLogout} />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;