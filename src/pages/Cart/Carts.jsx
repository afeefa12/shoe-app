
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Carts = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("user"));
  console.log(userId);
  

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/users/${userId.id}`);
        const fetchedCart = res.data.cart || [];
        setCartItems(fetchedCart);
        
        // Update localStorage and dispatch event for Navbar
        localStorage.setItem('cart', JSON.stringify(fetchedCart));
        window.dispatchEvent(new Event('cartUpdate'));
      } catch (error) {
        console.error("Error fetching cart:", error);
        alert("Failed to fetch cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId, navigate]);

  const removeFromCart = async (id) => {
    try {
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);
      
      // Update both backend and localStorage
      await axios.patch(`http://localhost:4000/users/${userId}`, { cart: updatedCart });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdate'));
      
      alert("Item removed from cart!");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

  const updateQuantity = async (id, change) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) } : item
    );
    setCartItems(updatedCart);
    try {
      // Update both backend and localStorage
      await axios.patch(`http://localhost:4000/users/${userId.id}`, { cart: updatedCart });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdate'));
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity. Please try again.");
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

      {loading ? (
        <p className="text-lg text-gray-600">Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-xl text-gray-500">Your cart is empty 😔</p>
      ) : (
        <div className="w-full max-w-4xl bg-gray p-6 rounded-lg shadow-lg">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4 mb-4">
              <img src={item.images} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-black-600 font-bold text-lg">${item.price}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className={`px-3 py-1 border rounded-md text-lg font-bold ${item.quantity === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"}`}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity || 1}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-3 py-1 border rounded-md text-lg font-bold text-gray-700 hover:bg-gray-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800 ml-4"
              >
                ❌
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-lg font-semibold">Total: <span className="text-yellow-600">${getTotalPrice().toFixed(2)}</span></p>
            <button
              className="bg-yellow-600 text-gray px-6 py-2 rounded-lg mt-4 hover:bg-yellow-600"
              onClick={() => navigate("/payment")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carts;