

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/Products");
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const addToCart = async (product) => {
//     if (!userId) {
//       alert("Please log in to add items to the cart.");
//       return;
//     }

//     try {
//       const userRes = await axios.get(`http://localhost:4000/users${userId}`);
//       let user = userRes.data;

//       if (!user || !user.cart) {
//         console.error("User data is missing or cart is undefined.");
//         return;
//       }

//       const existingItem = user.cart.find((item) => item.id === product.id);
//       if (existingItem) {
//         alert(`${product.name} is already in the cart!`);
//         return;
//       }

//       const updatedCart = [...user.cart, product];
//       await axios.patch(`http://localhost:4000/users/${userId}`, { cart: updatedCart });

//       alert(`${product.name} added to cart!`);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Shoes</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
//             <Link to={`/product/${product.id}`} className="w-full">
//               <img src={product.images} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
//               <h2 className="text-xl font-semibold text-gray-800 text-center">{product.name}</h2>
//             </Link>

//             <p className="text-gray-600 text-sm mb-2">₹{product.price}</p>
//             <button
//               onClick={() => navigate('/Cart')}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/Products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    if (!userId) {
      alert("Please log in to add items to the cart.");
      navigate("/login");
      return;
    }

    try {
      // Fetch user data
      const userRes = await axios.get(`http://localhost:4000/users/${userId}`);
      let user = userRes.data;

      if (!user.cart) {
        user.cart = []; // Initialize cart if not present
      }

      // Check if the item is already in the cart
      const existingItem = user.cart.find((item) => item.id === product.id);
      if (existingItem) {
        alert(`${product.name} is already in the cart!`);
        return;
      }

      // Add new product to cart
      const updatedCart = [...user.cart, { ...product, quantity: 1 }];

      // Update user's cart in the database
      await axios.patch(`http://localhost:4000/users/${userId}`, { cart: updatedCart });

      alert(`${product.name} added to cart!`);
      
      // Navigate to Cart page after adding
      navigate("/cart");

    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Shoes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
            <Link to={`/product/${product.id}`} className="w-full">
              <img src={product.images} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 text-center">{product.name}</h2>
            </Link>

            <p className="text-gray-600 text-sm mb-2">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
