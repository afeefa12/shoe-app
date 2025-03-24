
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Women = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
//     const [isLoggedIn, setIsLoggedIn] = useState(() => JSON.parse(localStorage.getItem("isLoggedIn")) || false);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get("http://localhost:4000/Products");
                
//                 const WomenProducts = response.data.filter(Product => 
//                     Product.categories === "Women" 
//                 );
//                 setProducts(WomenProducts);
//                 setError(null);
//             } catch (err) {
//                 console.error("Error fetching products:", err);
//                 setError("Failed to load products. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     useEffect(() => {
//         localStorage.setItem("cart", JSON.stringify(cart));
//         localStorage.setItem("cartCount", cart.length.toString());
//         window.dispatchEvent(new Event("cartUpdated"));
//     }, [cart]);

//     const isInCart = (productId) => cart.some((item) => item.id === productId);

//     const addToCart = (product) => {
//         if (!isLoggedIn) {
//             alert("Please log in to add items to your cart.");
//             return;
//         }
//         if (isInCart(product.id)) {
//             alert("Product is already in the cart.");
//             return;
//         }
//         setCart([...cart, { ...product, quantity: 1 }]);
//     };

//     const removeFromCart = (productId) => {
//         setCart(cart.filter((item) => item.id !== productId));
//     };

//     if (loading) {
//         return (
//             <div className="p-6 bg-white min-h-screen flex justify-center items-center">
//                 <div className="text-xl">Loading products...</div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="p-6 bg-white min-h-screen flex justify-center items-center">
//                 <div className="text-xl text-red-500">{error}</div>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 bg-white min-h-screen">
//             <h1 className="text-2xl font-bold text-center mb-6">Women's Collection</h1>
            
//             {products.length === 0 ? (
//                 <div className="text-center text-gray-500">No products available at the moment.</div>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {products.map((product) => (
//                         <div key={product.id} className="bg-white p-2 pb-4 rounded-lg shadow-sm border border-gray-100">
//                             <Link to={`/products/${product.id}`}>
//                                 <img
//                                     src={product.images}
//                                     alt={product.name}
//                                     className="w-full h-60 object-contain rounded-lg"
//                                     onError={(e) => {
//                                         e.target.src = "/placeholder-image.jpg"; // Fallback image
//                                         e.target.onerror = null;
//                                     }}
//                                 />
//                             </Link>
//                             <div className="px-2 mt-2">
//                                 <h3 className="text-base font-bold text-center text-gray-800">{product.name}</h3>
//                                 <p className="text-center text-gray-700 my-1">₹{product.price}</p>

//                                 {isInCart(product.id) ? (
//                                     <button
//                                         className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 w-full mt-2"
//                                         onClick={() => removeFromCart(product.id)}
//                                     >
//                                         Remove from Cart
//                                     </button>
//                                 ) : (
//                                     <button
//                                         className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 w-full mt-2"
//                                         onClick={() => addToCart(product)}
//                                     >
//                                         Add to Cart
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Women;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Women = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const [isLoggedIn, setIsLoggedIn] = useState(() => JSON.parse(localStorage.getItem("isLoggedIn")) || false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:4000/Products");
                const WomenProducts = response.data.filter(Product => 
                    Product.categories === "women" 
                );
                setProducts(WomenProducts);
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

    const addToCart = (product) => {
        if (!isLoggedIn) {
            alert("Please log in to add items to your cart.");
            return;
        }
        if (isInCart(product.id)) {
            alert("Product is already in the cart.");
            return;
        }
        setCart([...cart, { ...product, quantity: 1 }]);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
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
            <h1 className="text-2xl font-bold text-center mb-6">Women's Collection</h1>
            
            {products.length === 0 ? (
                <div className="text-center text-gray-500">No products available at the moment.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-2 pb-4 rounded-lg shadow-sm border border-gray-100">
                            <Link to={`/products/${product.id}`}>
                                <img
                                    src={product.images}
                                    alt={product.name}
                                    className="w-full h-60 object-contain rounded-lg"
                                    onError={(e) => {
                                        e.target.src = "/placeholder-image.jpg"; 
                                        e.target.onerror = null;
                                    }}
                                />
                            </Link>
                            <div className="px-2 mt-2">
                                <h3 className="text-base font-bold text-center text-gray-800">{product.name}</h3>
                                <p className="text-center text-gray-700 my-1">₹{product.price}</p>

                                {isInCart(product.id) ? (
                                    <button
                                        className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 w-full mt-2"
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

export default Women;