
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/Products/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [productId]);

  const addToCart = async () => {
    if (!userId) {
      alert("Please log in to add items to the cart.");
      navigate("/login");
      return;
    }
    
    if (!selectedSize && product.size && product.size.length > 0) {
      alert("Please select a size before adding to cart.");
      return;
    }
    
    try {
      const userRes = await axios.get(`http://localhost:4000/users/${userId.id}`);
      let user = userRes.data;

      if (!user.cart) {
        user.cart = [];
      }

      
      const existingItemIndex = user.cart.findIndex(
        (item) => item.productId === product.id && item.size === selectedSize
      );

      let updatedCart;
      
      if (existingItemIndex !== -1) {
        alert(`${product.name} (Size: ${selectedSize}) is already in the cart!`);
        return;
      } else {
        
        const cartItem = {
          productId: product.id,
          id: product.id, 
          name: product.name,
          price: product.price,
          image: product.images,
          description: product.description,
          size: selectedSize,
          quantity: quantity
        };
        
        updatedCart = [...user.cart, cartItem];
      }

      await axios.patch(`http://localhost:4000/users/${userId.id}`, { cart: updatedCart });

      alert(`${product.name} (Size: ${selectedSize}) added to cart!`);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-700 mt-10">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center text-gray-700 mt-10">Product not found</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <img
              src={product.images}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{product.description}</p>
            <p className="text-2xl font-semibold text-green-600 mt-4">Price: ₹{product.price}</p>
            {product.size && product.size.length > 0 && (
              <div className="mt-4">
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  Select Size:
                </label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select Size</option>
                  {product.size.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mt-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <div className="mt-1 flex items-center">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center px-3 py-1 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6">
              <button
                className={`bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition w-full text-center ${
                  !userId || (!selectedSize && product.size && product.size.length > 0) ? "opacity-50" : ""
                }`}
                onClick={addToCart}
                disabled={!userId || (!selectedSize && product.size && product.size.length > 0)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link to="/products" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;