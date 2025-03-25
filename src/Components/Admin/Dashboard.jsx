import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    users: [],
    products: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(dashboardData)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersRes, productsRes] = await Promise.all([
          fetch('http://localhost:4000/users'),
          fetch('http://localhost:4000/Products'),
        ]);

        if (!usersRes.ok) {
          throw new Error('Failed to fetch users data');
        }
        if (!productsRes.ok) {
          throw new Error('Failed to fetch products data');
        }
        const usersData = await usersRes.json();
        const productsData = await productsRes.json();
        const usersArray = Array.isArray(usersData) ? usersData : [];
        const totalUsers = usersArray.length;
        const allOrders = usersArray.flatMap((user) => user.orders || []);
        const totalOrders = allOrders.length;
        const totalSales = allOrders.reduce((sum, order) => sum + (order.price * (order.quantity || 1)), 0);
        const totalRevenue = totalSales * 0.10;
        const totalProducts = Array.isArray(productsData) ? productsData.length : 0;
        setDashboardData({
          totalUsers,
          totalOrders,
          totalProducts,
          totalSales,
          totalRevenue,
          users: usersArray,
          products: Array.isArray(productsData) ? productsData : [],
        });

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-6 text-gray-600">Loading dashboard data...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="container ml-72 max-w-[80vw] p-6 space-y-6">
      <h1 className="text-5xl font-bold">
        <span className="text-black">Shoe-</span>
        <span className="text-orange-400">Walk</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Users', value: dashboardData.totalUsers },
          { label: 'Total Orders', value: dashboardData.totalOrders },
          { label: 'Total Products', value: dashboardData.totalProducts },
        ].map((item) => (
          <div key={item.label} className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-600">{item.label}</h3>
            <p className="text-3xl font-bold text-orange-600">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'Total Sales', value: `$${dashboardData.totalSales.toFixed(2)}`, textColor: 'text-orange-700' },
          { label: 'Total Revenue', value: `$${dashboardData.totalRevenue.toFixed(2)}`, textColor: 'text-orange-500' },
        ].map((item) => (
          <div key={item.label} className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-600">{item.label}</h3>
            <p className={`text-3xl font-bold ${item.textColor}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Recent Registered Users</h3>
        {dashboardData.users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-orange-100">
                  <th className="text-left p-2 text-orange-800">User</th>
                  <th className="text-left p-2 text-orange-800">Email</th>
                  <th className="text-left p-2 text-orange-800">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.users.map((user) => {
                  if(user.role === 'admin'){
                    return;
                  }
                  const userTotalAmount = (user.orders || []).reduce(
                    (sum, order) => sum + (order.price || 0),
                    0
                  );
                  return (
                    <tr key={user.id || user.email || Math.random().toString()} className="border-t border-orange-200">
                      <td className="p-2 text-gray-700">{user.name || 'N/A'}</td>
                      <td className="p-2 text-gray-700">{user.email || 'N/A'}</td>
                      <td className="p-2 text-orange-600">${userTotalAmount.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No users available</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Recent Orders</h3>
        {dashboardData.users.flatMap(user => user.orders || []).length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-orange-100">
                  <th className="text-left p-2 text-orange-800">Order ID</th>
                  <th className="text-left p-2 text-orange-800">User</th>
                  <th className="text-left p-2 text-orange-800">Date</th>
                  <th className="text-left p-2 text-orange-800">Amount</th>
                  <th className="text-left p-2 text-orange-800">Status</th>
                </tr>
              </thead>
              <tbody>
              {dashboardData.users
                .flatMap((user) => (user.orders || []).map(order => ({ ...order, username: user.name }))) 
                .map((order, index) => (
                    <tr key={order.orderId || `order-${index}`} className="border-t border-orange-200">
                      <td className="p-2 text-gray-700">{order.id || 'N/A'}</td>
                      <td className="p-2 text-gray-700">{order.username || 'N/A'}</td>
                      <td className="p-2 text-gray-700">
                        {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="p-2 text-orange-600">
                        ${(order.price * order.quantity || 0).toFixed(2)}
                      </td>
                      <td className="p-2 text-gray-700">{order.status || 'N/A'}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No orders available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



