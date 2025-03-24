import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import Dashboard from "./Components/Admin/Dashboard";
import AdminProducts from "./Components/Admin/AdminProductList";
import AdminOrders from "./Components/Admin/AdminOrderList";
import Users from "./Components/Admin/Users";

// Protected Route component
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/products" element={<Layout><ProductList /></Layout>} />
        <Route path="/Login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/Payment" element={<Layout><Payment /></Layout>} />
        <Route path="/product/:productId" element={<Layout><ProductDetails /></Layout>} />
        <Route path="/Women" element={<Layout><Women /></Layout>} />
        <Route path="/Men" element={<Layout><Men /></Layout>} />
        <Route path="/order" element={<Layout><Order /></Layout>} />

        {/* Admin routes */}
        <Route 
          path="/adminlogin" 
          element={
            <Layout isAdmin={true}>
              <AdminLogin onLogin={handleLogin} />
            </Layout>
          } 
        />
        <Route 
          path="/adminsidebar" 
          element={
            <Layout isAdmin={true}>
              <ProtectedRoute user={user}>
                <AdminSidebar user={user} logout={handleLogout} />
              </ProtectedRoute>
            </Layout>
          } 
        />
        <Route 
          path="/Dashboard" 
          element={
            <Layout isAdmin={true}>
              <ProtectedRoute user={user}>
                <AdminSidebar user={user} logout={handleLogout} />
                <Dashboard user={user} logout={handleLogout} />
              </ProtectedRoute>
            </Layout>
          } 
        />
        <Route 
          path="/admin/products" 
          element={
            <Layout isAdmin={true}>
              <ProtectedRoute user={user}>
                <AdminSidebar user={user} logout={handleLogout} />
                <AdminProducts user={user} logout={handleLogout} />
              </ProtectedRoute>
            </Layout>
          } 
        />
        <Route 
          path="/admin/orders" 
          element={
            <Layout isAdmin={true}>
              <ProtectedRoute user={user}>
                <AdminSidebar user={user} logout={handleLogout} />
                <AdminOrders user={user} logout={handleLogout} />
              </ProtectedRoute>
            </Layout>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <Layout isAdmin={true}>
              <ProtectedRoute user={user}>
                <AdminSidebar user={user} logout={handleLogout} />
                <Users user={user} logout={handleLogout} />
              </ProtectedRoute>
            </Layout>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
