import React from "react";
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
// import Women from "./pages/Women/Women";
// import Men from "./pages/Men/Men";
import Order from "./Components/order";




function App() {
  return (
    <BrowserRouter>
        <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/Payment" element={<Payment/>}/>
        <Route path="/product/:productId" element={<ProductDetails/>}/>
        {/* <Route path="/Women" element={<Women/>}/> */}
        {/* <Route path="/Men" element={<Men/>}/> */}
        <Route path="/order" element={<Order/>}/>
      </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default App;
