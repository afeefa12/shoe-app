import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import "./App.css";
import Allproducts from "./Components/Allproducts/ProductDetails";
import Login from "./pages/Login/Login";
import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
        <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/allproducts" element={<Allproducts/>} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default App;
