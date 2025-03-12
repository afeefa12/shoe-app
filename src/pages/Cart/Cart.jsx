// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Carts = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (!userId) {
//       navigate("/login");
//       return;
//     }

//     const fetchCart = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4000/users/${userId}`);
//         setCartItems(res.data.cart || []);
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//         alert("Failed to fetch cart. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, [userId, navigate]);

//   const removeFromCart = async (id) => {
//     try {
//       const updatedCart = cartItems.filter((item) => item.id !== id);
//       setCartItems(updatedCart);

//       await axios.patch(`http://localhost:4000/users/${userId}`, { cart: updatedCart });

//       alert("Item removed from cart!");
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//       alert("Failed to remove item. Please try again.");
//     }
//   };

//   const updateQuantity = async (id, change) => {
//     const updatedCart = cartItems.map((item) =>
//       item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) } : item
//     );
//     setCartItems(updatedCart);

//     try {
//       await axios.patch(`http://localhost:4000/users/${userId}`, { cart: updatedCart });
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       alert("Failed to update quantity. Please try again.");
//     }
//   };

//   return (
//     <div className="cart-container">
//       <h1>Your Cart</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : cartItems.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         cartItems.map((item) => (
//           <div key={item.id} className="cart-item">
//             <img src={item.images} alt={item.name} className="cart-item-image" />
//             <div className="cart-details">
//               <h2>{item.name}</h2>
//               <p>{item.description}</p>
//               <p className="price">${item.price}</p>
//               <div className="quantity-controls">
//                 <button onClick={() => updateQuantity(item.id, -1)}>-</button>
//                 <span>{item.quantity || 1}</span>
//                 <button onClick={() => updateQuantity(item.id, 1)}>+</button>
//               </div>
//               <button onClick={() => removeFromCart(item.id)} className="remove-btn">
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))
//       )}

//       {cartItems.length > 0 && (
//         <button className="checkout-btn" onClick={() => navigate("/payment")}>
//           Proceed to Payment
//         </button>
//       )}
//     </div>
//   );
// };

// export default Carts;
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Carts = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (!userId) {
//       alert(" ")
//       navigate("/login");
//       return;
//     }

//     const fetchCart = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4000/users/${userId}`);
//         setCartItems(res.data.cart || []);
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//         alert("Failed to fetch cart. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, [userId, navigate]);

//   const removeFromCart = async (id) => {
//     try {
//       const updatedCart = cartItems.filter((item) => item.id !== id);
//       setCartItems(updatedCart);

//       await axios.patch(`http://localhost:4000/users/${userId}`, { cart: updatedCart });

//       alert("Item removed from cart!");
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//       alert("Failed to remove item. Please try again.");
//     }
//   };

//   const updateQuantity = async (id, change) => {
//     const updatedCart = cartItems.map((item) =>
//       item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) } : item
//     );
//     setCartItems(updatedCart);

//     try {
//       await axios.patch(`http://localhost:4000/users/${userId}`, { cart: updatedCart });
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       alert("Failed to update quantity. Please try again.");
//     }
//   };

//   return (
//     <div className="cart-container">
//       <h1>Your Cart</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : cartItems.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         cartItems.map((item) => (
//           <div key={item.id} className="cart-item">
//             <img src={item.images} alt={item.name} width={100} />
//             <h3>{item.name}</h3>
//             <p>Price: ₹{item.price}</p>
//             <div>
//               <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity === 1}>
//                 -
//               </button>
//               <span>{item.quantity}</span>
//               <button onClick={() => updateQuantity(item.id, 1)}>+</button>
//             </div>
//             <button onClick={() => removeFromCart(item.id)}>Remove</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Carts;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Carts = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      alert(" ");
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/users/${userId}`);
        setCartItems(res.data.cart || []);
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

      await axios.patch(`http://localhost:4000/users/${userId}`, { cart: updatedCart });

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
      await axios.patch(`http://localhost:4000/users/${userId}`, { cart: updatedCart });
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
            >
              <img src={item.images} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
              
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">Price: ₹{item.price}</p>
              </div>

              <div className="flex items-center">
                <button
                  className="px-2 py-1 text-lg font-bold bg-gray-200 rounded-md"
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  className="px-2 py-1 text-lg font-bold bg-gray-200 rounded-md"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>

              <button
                className="ml-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carts;

