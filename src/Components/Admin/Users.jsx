import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);

  // Extract fetchUsers as a separate function so it can be reused
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

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

  // Handler for refresh button
  const handleRefresh = () => {
    fetchUsers(); // Simply call the fetchUsers function again
  };

  return (
    <div className="space-y-6 p-6 bg-orange-50 min-h-screen ml-72 max-w-[80vw]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-orange-600">Manage Users</h1>
        <button
          onClick={handleRefresh} // Use the new handler
          className="text-orange-600 hover:text-orange-800 text-sm font-medium"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
        <div className="mb-4">
          <p className="text-orange-700">
            Total Users: {users.length} (Excluding Admin)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-orange-200">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-orange-200">
              {users
                .filter(user => user.email.toLowerCase() !== 'admin@gmail.com')
                .map((user) => (
                  <tr key={user.id} className="hover:bg-orange-50">
                    <td className="px-6 py-4 whitespace-nowrap text-orange-600">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-orange-800">
                      {user.username}
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
                        className={`px-3 py-1 rounded-md text-white font-medium ${
                          user.isBlocked
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-red-600 hover:bg-red-700'
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
      </div>
    </div>
  );
};

export default Users;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Try using axios instead of fetch

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isUpdating, setIsUpdating] = useState(null);

//   // Try different API endpoints
//   const API_ENDPOINTS = [
//     'http://localhost:4000/users',
//     'http://localhost:4000/api/users',
//     'http://localhost:4000/users',
//     '', // Relative path if your frontend and backend are on same origin
//     '/api/users'
//   ];
  
//   // Try retrieving token from different storage locations
//   const getAuthToken = () => {
//     return (
//       localStorage.getItem('token') ||
//       localStorage.getItem('authToken') ||
//       localStorage.getItem('userToken') ||
//       sessionStorage.getItem('token') ||
//       ''
//     );
//   };

//   useEffect(() => {
//     fetchUsers();
    
//     // Add this to check for CORS issues
//     console.log('Current origin:', window.location.origin);
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
    
//     // Try axios instead of fetch
//     let success = false;
    
//     // Try multiple endpoints
//     for (const endpoint of API_ENDPOINTS) {
//       if (success) break;
      
//       try {
//         console.log(`Attempting to fetch users from: ${endpoint}`);
        
//         // Try with axios
//         const response = await axios.get(endpoint, {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${getAuthToken()}`
//           },
//           withCredentials: true,
//           timeout: 8000
//         });
        
//         console.log('Response received:', response);
        
//         // Check where the data might be in the response
//         let userData = null;
//         if (response.data && Array.isArray(response.data)) {
//           userData = response.data;
//         } else if (response.data && response.data.users && Array.isArray(response.data.users)) {
//           userData = response.data.users;
//         } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
//           userData = response.data.data;
//         } else if (response.data) {
//           console.log('Unexpected data format, trying to extract users:', response.data);
//           // Last resort - try to find an array in the response
//           for (const key in response.data) {
//             if (Array.isArray(response.data[key])) {
//               userData = response.data[key];
//               console.log(`Found users array in response.data.${key}`);
//               break;
//             }
//           }
//         }
        
//         if (userData) {
//           console.log(`Successfully retrieved ${userData.length} users from ${endpoint}`);
//           setUsers(userData);
//           success = true;
//           break;
//         } else {
//           console.warn(`No users found in response from ${endpoint}`);
//         }
//       } catch (err) {
//         console.error(`Error fetching from ${endpoint}:`, err);
//         // Continue to next endpoint
//       }
//     }
    
//     // If all endpoints failed
//     if (!success) {
//       // Try one more time with fetch as a fallback
//       try {
//         const response = await fetch('http://localhost:4000/users', {
//           credentials: 'include',
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           if (Array.isArray(data)) {
//             setUsers(data);
//             success = true;
//           } else if (data && Array.isArray(data.users)) {
//             setUsers(data.users);
//             success = true;
//           }
//         }
//       } catch (fetchErr) {
//         console.error('Fallback fetch also failed:', fetchErr);
//       }
//     }
    
//     if (!success) {
//       setError('Could not connect to any API endpoint. Please check your server or network connection.');
      
//       // For testing, provide mock data if everything fails
//       console.log('Using mock data for testing UI');
//       setUsers([
//         { id: 1, username: 'testuser1', email: 'test1@example.com', isBlocked: false },
//         { id: 2, username: 'testuser2', email: 'test2@example.com', isBlocked: true },
//       ]);
//     }
    
//     setLoading(false);
//   };

//   const handleToggleBlock = async (id, currentStatus) => {
//     if (!id) {
//       setError("Cannot update user: Missing ID");
//       return;
//     }
    
//     setIsUpdating(id);
    
//     try {
//       const newStatus = !currentStatus;
//       console.log(`Attempting to ${newStatus ? 'block' : 'unblock'} user ${id}`);
      
//       // Try with axios first
//       const response = await axios.patch(`http://localhost:4000/users/${id}`, 
//         { isBlocked: newStatus },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${getAuthToken()}`
//           },
//           withCredentials: true,
//           timeout: 5000
//         }
//       );
      
//       console.log('Update response:', response);
      
//       if (response.status >= 200 && response.status < 300) {
//         // Update was successful
//         setUsers(prevUsers =>
//           prevUsers.map(user =>
//             user.id === id ? { ...user, isBlocked: newStatus } : user
//           )
//         );
//         console.log(`Successfully ${newStatus ? 'blocked' : 'unblocked'} user ${id}`);
//       } else {
//         throw new Error(`Server returned status ${response.status}`);
//       }
//     } catch (err) {
//       console.error(`Failed to update user ${id}:`, err);
//       setError(`Failed to update user: ${err.message || 'Unknown error'}`);
      
//       // Try fallback with fetch
//       try {
//         const fetchResponse = await fetch(`http://localhost:4000/users/${id}`, {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//           body: JSON.stringify({ isBlocked: !currentStatus }),
//         });
        
//         if (fetchResponse.ok) {
//           setUsers(prevUsers =>
//             prevUsers.map(user =>
//               user.id === id ? { ...user, isBlocked: !currentStatus } : user
//             )
//           );
//           setError(null);
//         } else {
//           throw new Error(`Fetch fallback failed with status ${fetchResponse.status}`);
//         }
//       } catch (fetchErr) {
//         console.error('Fetch fallback also failed:', fetchErr);
//         // Keep the original error
//       }
//     } finally {
//       setIsUpdating(null);
//     }
//   };

//   return (
//     <div className="space-y-6 p-6 bg-orange-50 min-h-screen ml-72 max-w-[80vw]">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-orange-600">Manage Users</h1>
//         <button
//           onClick={fetchUsers}
//           className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none"
//           disabled={loading}
//         >
//           {loading ? 'Loading...' : 'Refresh'}
//         </button>
//       </div>

//       {error && (
//         <div className="mb-4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded">
//           <p>{error}</p>
//           <button
//             onClick={fetchUsers}
//             className="mt-2 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
//           >
//             Try Again
//           </button>
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center items-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//         </div>
//       ) : (
//         <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
//           <div className="mb-4">
//             <p className="text-orange-700">
//               Total Users: {users.filter(user => !user.email || user.email.toLowerCase() !== 'admin@gmail.com').length} (Excluding Admin)
//             </p>
//           </div>

//           {users.length === 0 ? (
//             <div className="text-center py-8 text-orange-600">
//               No users found. Please check your server connection.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-orange-200">
//                 <thead className="bg-orange-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
//                       ID
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-orange-200">
//                   {users
//                     .filter(user => !user.email || user.email.toLowerCase() !== 'admin@gmail.com')
//                     .map((user) => (
//                       <tr key={user.id || Math.random()} className="hover:bg-orange-50">
//                         <td className="px-6 py-4 whitespace-nowrap text-orange-600">
//                           {user.id || 'N/A'}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-orange-800">
//                           {user.username || user.name || 'Unknown'}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-orange-700">
//                           {user.email || 'No email'}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                               user.isBlocked
//                                 ? 'bg-red-100 text-red-800'
//                                 : 'bg-green-100 text-green-800'
//                             }`}
//                           >
//                             {user.isBlocked ? 'Blocked' : 'Active'}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <button
//                             onClick={() => handleToggleBlock(user.id, user.isBlocked)}
//                             disabled={isUpdating === user.id || !user.id}
//                             className={`px-3 py-1 rounded-md text-white font-medium ${
//                               user.isBlocked
//                                 ? 'bg-green-600 hover:bg-green-700'
//                                 : 'bg-red-600 hover:bg-red-700'
//                             } ${
//                               isUpdating === user.id || !user.id
//                                 ? 'opacity-50 cursor-not-allowed'
//                                 : 'cursor-pointer'
//                             }`}
//                           >
//                             {isUpdating === user.id
//                               ? 'Updating...'
//                               : user.isBlocked
//                               ? 'Unblock'
//                               : 'Block'}
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Users;