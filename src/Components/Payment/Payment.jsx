import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card"); 
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!userId) {
            navigate("/login");
            return;
        }

        const fetchCart = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/users/${userId.id}`);
                setCartItems(res.data.cart || []);
            } catch (error) {
                console.error("Error fetching cart:", error);
                setError("Failed to fetch cart. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [userId, navigate]);

    const handlePayment = async (e) => {
        e.preventDefault();
        setProcessing(true);

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            setProcessing(false);
            return;
        }

        try {
            const userResponse = await axios.get(`http://localhost:4000/users/${userId.id}`);
            const existingOrders = userResponse.data.orders || [];
            const newOrders = cartItems.map((item) => ({
                ...item,
                id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                userId,
                date: new Date().toISOString(),
                status: paymentMethod === "cod" ? "Pending" : "Processing",
                paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Credit Card",
            }));


            await axios.patch(`http://localhost:4000/users/${userId.id}`, {
                orders: [...existingOrders, ...newOrders],
                cart: [],
            });
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdate'));
            setCartItems([]);
            if (paymentMethod === "cod") {
                alert("Order Placed Successfully! Pay on delivery.");
            } else {
                alert("Payment Successful! Your order has been placed.");
            }
            navigate("/order");
            
        } catch (error) {
            console.error("Error processing payment:", error);
            alert(`Payment failed. Reason: ${error.message || "Unknown error"}`);
        } finally {
            setProcessing(false);
        }
    };
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Billing Details</h2>
            {loading ? (
                <p className="text-gray-500">Loading cart...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
            ) : (
                <form onSubmit={handlePayment} className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            {cartItems.map((product) => (
                                <div key={product.id} className="flex justify-between items-center border-b pb-4">
                                    <div className="flex items-center">
                                        <img
                                            src={product.images}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium">{product.name}</h3>
                                            <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-semibold">${(product.price * product.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <h3 className="text-xl font-semibold">Total</h3>
                            <p className="text-xl font-semibold">${totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="card-payment"
                                    name="payment-method"
                                    value="card"
                                    checked={paymentMethod === "card"}
                                    onChange={() => setPaymentMethod("card")}
                                    className="mr-2"
                                />
                                <label htmlFor="card-payment" className="text-gray-700">Credit/Debit Card</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="cod-payment"
                                    name="payment-method"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={() => setPaymentMethod("cod")}
                                    className="mr-2"
                                />
                                <label htmlFor="cod-payment" className="text-gray-700">Cash on Delivery</label>
                            </div>
                        </div>
                    </div>
                    {paymentMethod === "card" && (
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
                            <h2 className="text-xl font-semibold mb-4">Card Details</h2>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Card Number *</label>
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Expiry Date *</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">CVV *</label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Name on Card *</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                        </div>
                    )}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Full Name *</label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Street Address *</label>
                            <input
                                type="text"
                                placeholder="street address"
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">City *</label>
                                <input
                                    type="text"
                                    placeholder="city"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Zip/Postal Code *</label>
                                <input
                                    type="text"
                                    placeholder="postel  code "
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Phone Number *</label>
                            <input
                                type="tel"
                                placeholder="+9112345678"
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full py-3 px-4 rounded-lg transition duration-200 ${
                            processing 
                            ? "bg-gray-400 cursor-not-allowed" 
                            : "bg-yellow-500 hover:bg-yellow-600 text-white"
                        }`}
                    >
                        {processing 
                            ? "Processing..." 
                            : paymentMethod === "cod" 
                              ? "Place Order (Pay on Delivery)" 
                              : "Pay Now"
                        }
                    </button>
                </form>
            )}
        </div>
    );
};

export default Payment;