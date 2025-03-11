
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/AuthContext/AuthContext"

const AllProducts = ({ AddToCart }) => {
  // State to store the list of products
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API 
    const getAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setAllProducts(response.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getAllProducts();
  }, []);

  const { isLoggedIn } = useAuth(); 

  return (
    <>
  
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((AllItems, index) => (
            <div
              key={index}
              className="p-4 shadow-lg rounded-2xl bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
            >
              <Link to={`/ProductDetails/${AllItems.id}`}>
              <img
                src={AllItems.image}
                className="w-full h-64 object-contain rounded-t-lg"
                alt={AllItems.name}
              />
              </Link>
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{AllItems.name}</h2>
                <p className="text-lg font-bold text-blue-700 mb-3">₹{AllItems.price}</p>
                
                <div className="grid grid-cols-2 gap-2">
                  {isLoggedIn ? (
                    <button
                      className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg px-5 py-2.5"
                      onClick={() => AddToCart(AllItems)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <Link to="/login">
                      <button
                        className="w-full text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg px-5 py-2.5"
                      >
                        Login to Add to Cart
                      </button>
                    </Link>
                  )}

                  <Link to={"/cart"}>
                    <button className="w-full text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg px-5 py-2.5">
                      Go to Cart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts