
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Men = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const [isLoggedIn, setIsLoggedIn] = useState(() => JSON.parse(localStorage.getItem("isLoggedIn")) || false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:4000/Products", {
                    params: { categories: "men" }
                });
                const menProducts = response.data.filter(product => 
                    product.categories?.toLowerCase() === "men"
                );
                setProducts(menProducts);
                setError(null);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("cartCount", cart.length.toString());
        window.dispatchEvent(new Event("cartUpdated"));
    }, [cart]);

    const isInCart = (productId) => cart.some((item) => item.id === productId);

    const addToCart = async (product) => {
        if (!isLoggedIn) {
            alert("Please log in to add items to your cart.");
            navigate("/login");
            return;
        }

        if (isInCart(product.id)) {
            alert("Product is already in the cart.");
            return;
        }

        try {

            const response = await axios.get(`http://localhost:4000/Products/${product.id}`);
            const serverProduct = response.data;

            const cartItem = { 
                id: serverProduct.id,
                name: serverProduct.name,
                price: serverProduct.price,
                quantity: 1,
                image: serverProduct.images || "/placeholder-image.jpg",
                categories: serverProduct.categories
            };

            setCart(prevCart => [...prevCart, cartItem]);
            alert(`${serverProduct.name} added to cart successfully!`);
        } catch (err) {
            console.error("Error verifying product:", err);
            setError("Failed to add product to cart. Please try again.");
        }
    };

    const removeFromCart = (productId) => {
        const productToRemove = cart.find(item => item.id === productId);
        setCart(prevCart => prevCart.filter((item) => item.id !== productId));
        alert(`${productToRemove.name} removed from cart!`);
    };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    if (loading) {
        return (
            <div className="p-6 bg-white min-h-screen flex justify-center items-center">
                <div className="text-xl">Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-white min-h-screen flex justify-center items-center">
                <div className="text-xl text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Men's Collection</h1>
            
            {products.length === 0 ? (
                <div className="text-center text-gray-500">No products available in the Men's category.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div 
                            key={product.id} 
                            className="bg-white p-2 pb-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div 
                                onClick={() => handleProductClick(product.id)}
                                className="cursor-pointer"
                            >
                                <img
                                    src={product.images || "/placeholder-image.jpg"}
                                    alt={product.name || "Product"}
                                    className="w-full h-60 object-contain rounded-lg"
                                    onError={(e) => {
                                        e.target.src = "/placeholder-image.jpg";
                                        e.target.onerror = null;
                                    }}
                                />
                            </div>
                            <div className="px-2 mt-2">
                                <h3 className="text-base font-bold text-center text-gray-800 truncate">
                                    {product.name || "Unnamed Product"}
                                </h3>
                                <p className="text-center text-gray-700 my-1">
                                    ₹{product.price?.toLocaleString() || "N/A"}
                                </p>
                                <p className="text-center text-gray-500 text-sm truncate">
                                    {product.description || "No description available"}
                                </p>

                                {isInCart(product.id) ? (
                                    <button
                                        className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 w-full mt-2"
                                        onClick={() => removeFromCart(product.id)}
                                    >
                                        Remove from Cart
                                    </button>
                                ) : (
                                    <button
                                        className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 w-full mt-2"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Men;