
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
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
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please log in to add items to the cart.");
      navigate("/login");
      return;
    }

    const userId = JSON.parse(storedUser).id; 

    try {
      console.log("Fetching user data for ID:", userId);
      const { data: user } = await axios.get(`http://localhost:4000/users/${userId}`);

      if (!user) {
        console.error("User not found.");
        alert("User not found. Please log in again.");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      } 

      const updatedCart = user.cart ? [...user.cart] : [];
      if (updatedCart.some((item) => item.id === product.id)) {
        alert(`${product.name} is already in the cart!`);
        return;
      }

      updatedCart.push({ ...product, quantity: 1 });

      await axios.patch(`http://localhost:4000/users/${userId}`, { cart: updatedCart });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdate"));

      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Shoes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
            <Link to={`/product/${product.id}`} className="w-full">
              <img
                src={product.images || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 text-center">{product.name}</h2>
            </Link>

            <p className="text-gray-600 text-sm mb-2">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
