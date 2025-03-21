// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AdminProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:4000/products');
//       setProducts(response.data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to fetch products. Please try again later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await axios.delete(`http://localhost:4000/products/${productId}`);
//         setProducts(products.filter(product => product.id !== productId));
//         setError(null);
//       } catch (err) {
//         setError('Failed to delete product. Please try again.');
//         console.error(err);
//       }
//     }
//   };

//   const filteredProducts = products.filter(product =>
//     product.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//           Manage Products
//         </h1>
//         <div className="flex gap-4 w-full sm:w-auto">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 w-full sm:w-64"
//           />
//           <Link 
//             to="/admin/products/add"
//             className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium whitespace-nowrap"
//           >
//             Add Product
//           </Link>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//           </svg>
//           {error}
//         </div>
//       )}

//       {/* Loading State */}
//       {loading && (
//         <div className="text-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
//           <span className="text-gray-600 mt-4 block">Loading products...</span>
//         </div>
//       )}

//       {/* Products Table */}
//       {!loading && filteredProducts.length > 0 && (
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-orange-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                     Image
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                     Stock
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredProducts.map((product) => (
//                   <tr key={product.id} className="hover:bg-orange-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         {product.image ? (
//                           <img 
//                             src={product.image} 
//                             alt={product.name} 
//                             className="h-10 w-10 object-cover rounded"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = "/placeholder.png";
//                             }}
//                           />
//                         ) : (
//                           <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
//                             <span className="text-xs text-gray-500">No img</span>
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {product.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       ${Number(product.price || 0).toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {product.category || 'N/A'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       <span className={`px-2 py-1 rounded-full text-xs ${
//                         (product.stock || 0) > 10 
//                           ? 'bg-green-100 text-green-800' 
//                           : (product.stock || 0) > 0
//                             ? 'bg-yellow-100 text-yellow-800'
//                             : 'bg-red-100 text-red-800'
//                       }`}>
//                         {(product.stock || 0) > 0 ? product.stock : 'Out of stock'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <div className="flex items-center gap-4">
//                         <button
//                           onClick={() => navigate(`/admin/products/edit/${product.id}`)}
//                           className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(product.id)}
//                           className="text-red-600 hover:text-red-800 font-medium transition-colors"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && filteredProducts.length === 0 && (
//         <div className="text-center py-12 bg-white rounded-lg shadow">
//           <svg 
//             className="mx-auto h-12 w-12 text-orange-400" 
//             fill="none" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth={2} 
//               d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
//             />
//           </svg>
//           <p className="mt-2 text-gray-600">
//             {searchTerm 
//               ? 'No products match your search.' 
//               : 'No products found. Add a product to get started!'
//             }
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminProducts;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null); // Track product being edited
  const [editFormData, setEditFormData] = useState({ 
    name: '', 
    price: '', 
    category: '', 
    images: '' 
  }); // Form data for editing
  const [isAddingProduct, setIsAddingProduct] = useState(false); // Track if adding new product
  const [addFormData, setAddFormData] = useState({ 
    name: '', 
    price: '', 
    category: '', 
    images: '' 
  }); // Form data for adding
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/Products');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:4000/Products/${productId}`);
        setProducts(products.filter(product => product.id !== productId));
        setError(null);
      } catch (err) {
        setError('Failed to delete product. Please try again.');
        console.error(err);
      }
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditFormData({ 
      name: product.name || '', 
      price: product.price || '', 
      category: product.category || '', 
      images: product.images || '' 
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = { ...editingProduct, ...editFormData };
      await axios.put(`http://localhost:4000/Products/${editingProduct.id}`, updatedProduct);
      setProducts(products.map(product => 
        product.id === editingProduct.id ? updatedProduct : product
      ));
      setEditingProduct(null);
      setError(null);
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error(err);
    }
  };

  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddFormData({ ...addFormData, [name]: value });
  };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/Products', addFormData);
      setProducts([...products, response.data]);
      setIsAddingProduct(false);
      setAddFormData({ name: '', price: '', category: '', images: '' });
      setError(null);
    } catch (err) {
      setError('Failed to add product. Please try again.');
      console.error(err);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container ml-72 max-w-[80vw] px-4 py-8 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Manage Products
        </h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 w-full sm:w-64"
          />
          <button
            onClick={() => setIsAddingProduct(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium whitespace-nowrap"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <span className="text-gray-600 mt-4 block">Loading products...</span>
        </div>
      )}

      {/* Products Table */}
      {!loading && !editingProduct && !isAddingProduct && filteredProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.images ? (
                          <img 
                            src={product.images} 
                            alt={product.name} 
                            className="h-10 w-10 object-cover rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder.png";
                            }}
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">No img</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${Number(product.price || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        (product.stock || 0) > 10 
                          ? 'bg-green-100 text-green-800' 
                          : (product.stock || 0) > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {(product.stock || 0) > 0 ? product.stock : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800 font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {editingProduct && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Product</h3>
          <form onSubmit={handleEditFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditFormChange}
                className="mt-1 block w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={editFormData.price}
                onChange={handleEditFormChange}
                className="mt-1 block w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={editFormData.category}
                onChange={handleEditFormChange}
                className="mt-1 block w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={editFormData.image}
                onChange={handleEditFormChange}
                className="mt-1 block w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
             </div>
          </form>
        </div>
      )}

      {/* Add Product Form */}
      {isAddingProduct && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Add Product</h3>
          <form onSubmit={handleAddFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={addFormData.name}
                onChange={handleAddFormChange}
                className="mt-1 block w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={addFormData.price}
                onChange={handleAddFormChange}
                className="mt-1 block w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={addFormData.category}
                onChange={handleAddFormChange}
                className="mt-1 block w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={addFormData.image}
                onChange={handleAddFormChange}
                className="mt-1 block w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setIsAddingProduct(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Empty State */}
      {!loading && !editingProduct && !isAddingProduct && filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg 
            className="mx-auto h-12 w-12 text-orange-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="mt-2 text-gray-600">
            {searchTerm 
              ? 'No products match your search.' 
              : 'No products found. Add a product to get started!'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;

