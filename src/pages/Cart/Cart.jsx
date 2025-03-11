import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';

const Cart = () => {
  return (
    <>
      <Link to="/cart">
        <button className="cursor-pointer">Cart</button>
      </Link>
    </>
  );
};

export default Cart;
