import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import "./App.css";

import Login from "./pages/Login/Login";
import Layout from "./Components/Layout/Layout";
import Signup from "./pages/SignUp/SignUp";
import ProductList from "./Components/Allproducts/Allproducts";
// import Payment from "./Components/Payment/Payment";


function App() {
  return (
    <BrowserRouter>
        <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/allproducts" element={<ProductList/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/Cart" element={<Cart/>}/>
        {/* <Route path="/Payment" element={<Payment/>}/> */}
      </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default App;
