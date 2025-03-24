import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Filter, User } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/users', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      applyFilters(data, searchTerm, statusFilter);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const applyFilters = (usersList, search, status) => {
    let result = usersList.filter(user => user.email.toLowerCase() !== 'admin@gmail.com');
    
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        user => 
          user.username.toLowerCase().includes(searchLower) || 
          user.email.toLowerCase().includes(searchLower)
      );
    }
    if (status === 'active') {
      result = result.filter(user => !user.isBlocked);
    } else if (status === 'blocked') {
      result = result.filter(user => user.isBlocked);
    }
    
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredUsers(result);
  };
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    applyFilters(users, searchTerm, statusFilter);
  }, [users, searchTerm, statusFilter, sortConfig]);

  const handleToggleBlock = async (id, currentStatus) => {
    setIsUpdating(id);
    setError(null);

    try {
      const newStatus = !currentStatus;
      const response = await fetch(`http://localhost:4000/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isBlocked: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user status: ${response.status}`);
      }

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === id ? { ...user, isBlocked: newStatus } : user
        )
      );
    } catch (err) {
      setError(`Failed to update user status: ${err.message}`);
    } finally {
      setIsUpdating(null);
    }
  };
  const handleRefresh = () => {
    setSearchTerm('');
    setStatusFilter('all');
    fetchUsers();
  };
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <div className="space-y-6 p-6 bg-orange-50 min-h-screen ml-72 max-w-[80vw]">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <User className="h-6 w-6 text-yellow-600" />
          <h1 className="text-3xl font-bold text-yellow-600">Manage Users</h1>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-orange-100 border-l-4 border-yellow-500 text-orange-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-yellow-500">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <p className="text-yellow-700">
              Total Users: {filteredUsers.length} 
              {filteredUsers.length !== users.filter(u => u.email.toLowerCase() !== 'admin@gmail.com').length && 
                ` (Filtered from ${users.filter(u => u.email.toLowerCase() !== 'admin@gmail.com').length})`}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-yellow-500" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-yellow-500" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-3 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="all">All Users</option>
                <option value="active">Active Only</option>
                <option value="blocked">Blocked Only</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-yellow-500"></div>
            <p className="mt-2 text-yellow-600">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-10 text-yellow-600">
            <p>No users match your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-orange-200">
              <thead className="bg-orange-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider cursor-pointer hover:bg-orange-100"
                    onClick={() => requestSort('id')}
                  >
                    ID{getSortIndicator('id')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider cursor-pointer hover:bg-orange-100"
                    onClick={() => requestSort('username')}
                  >
                    Name{getSortIndicator('username')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider cursor-pointer hover:bg-orange-100"
                    onClick={() => requestSort('email')}
                  >
                    Email{getSortIndicator('email')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider cursor-pointer hover:bg-orange-100"
                    onClick={() => requestSort('isBlocked')}
                  >
                    Status{getSortIndicator('isBlocked')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-orange-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-orange-50">
                    <td className="px-6 py-4 whitespace-nowrap text-orange-600">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-orange-800">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-orange-700">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isBlocked
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {user.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleBlock(user.id, user.isBlocked)}
                        disabled={isUpdating === user.id}
                        className={`px-3 py-1 rounded-md text-white font-medium transition duration-200 ${
                          user.isBlocked
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-green-600 hover:bg-green-700'
                        } ${
                          isUpdating === user.id
                            ? 'opacity-50 cursor-not-allowed'
                            : 'cursor-pointer'
                        }`}
                      >
                        {isUpdating === user.id
                          ? 'Updating...'
                          : user.isBlocked
                          ? 'Unblock'
                          : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;

