import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null); // Track which order is being updated

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:4000/users', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }

        const users = await response.json();
        
        const allOrders = users
          .filter(user => user.orders && user.orders.length > 0)
          .flatMap(user => user.orders.map(order => ({
            ...order,
            customerName: user.username,
            customerEmail: user.email,
            orderId: order.orderId || `ORD-${user.id}-${order.date}`, // Use user.id instead of userId
            userId: user.id, // Ensure userId is included
          })))
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending

        setOrders(allOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, userId, newStatus) => {
    setIsUpdating(orderId);
    setError(null);

    try {
      const userResponse = await fetch(`http://localhost:4000/users/${userId}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
      const user = await userResponse.json();

      const updatedOrders = user.orders.map(order => 
        (order.orderId || `ORD-${userId}-${order.date}`) === orderId 
          ? { ...order, status: newStatus } 
          : order
      );

      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orders: updatedOrders }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(`Failed to update order status: ${err.message}`);
    } finally {
      setIsUpdating(null);
    }
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  const ErrorMessage = ({ message }) => (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded" role="alert">
        <p>Error: {message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-orange-800 underline hover:text-orange-900"
        >
          Retry
        </button>
      </div>
    </div>
  );

  if (loading) return <LoadingSpinner />;
  if (error && orders.length === 0) return <ErrorMessage message={error} />;

  return (
    <div className="container ml-72 max-w-[80vw] px-4 py-8 bg-orange-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-orange-800 mb-6">Order Management</h1>
      
      {error && (
        <div className="mb-4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-orange-200">
        <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-orange-600 text-lg font-medium">Total Orders: {orders.length}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-orange-600 hover:text-orange-800 text-sm font-medium"
            >
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-orange-100">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Order ID</th>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Customer</th>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Email</th>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Total</th>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Status</th>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-200">
                {orders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-orange-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customerEmail}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.totalAmount?.toFixed(2) || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Processing' ? 'bg-orange-100 text-orange-800' :
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.orderId, order.userId, e.target.value)}
                        disabled={isUpdating === order.orderId}
                        className={`border border-orange-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-700 ${
                          isUpdating === order.orderId ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;