import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  const userId = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
console.log("user",userId);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/users/${userId.id}`);
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [ navigate]);

  if (loading) return <div className="text-center py-8">Loading your orders...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (orders.length === 0) return <div className="text-center py-8">You don't have any orders yet.</div>;

 
  const groupedOrders = orders.reduce((acc, order) => {
    const date = new Date(order.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h1>
      
      {Object.entries(groupedOrders).map(([date, orderGroup]) => (
        <div key={date} className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Order Date: {date}</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {orderGroup.map((order, index) => (
              <div key={`${order.id}-${index}`} className="border-b last:border-b-0 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Status: 
                    <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                      order.status === "Processing" ? "bg-yellow-100 text-yellow-700" : 
                      order.status === "Shipped" ? "bg-blue-100 text-blue-700" : 
                      "bg-green-100 text-green-700"
                    }`}>
                      {order.status}
                    </span>
                  </span>
                  <span className="text-gray-500 text-sm">Order ID: {order.id}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={order.image} 
                    alt={order.name} 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{order.name}</h3>
                    <p className="text-gray-600">Quantity: {order.quantity}</p>
                    <p className="font-semibold mt-1">${(order.price * order.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Order;