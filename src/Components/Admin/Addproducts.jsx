import React, { useState } from "react";
const Addproducts = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    categories: "",
    images: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name.trim() || product.price <= 0) {
      alert("Please enter a valid name and price");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/Products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          price: parseFloat(product.price)
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      alert("Product added successfully!");
      setProduct({
        name: "",
        price: "",
        description: "",
        categories: "",
        images: ""
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div className="ml-72 max-w-[80vw] mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-yellow-800">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-yellow-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-yellow-300 shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
            placeholder="Enter product name"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-yellow-300 shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
            placeholder="Enter price"
            required
            min="0"
            step="0.01"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-700">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-yellow-300 shadow-sm focus:border-yellow-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            placeholder="Enter product description"
            rows="3"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-700">
            Category
          </label>
          <input
            type="text"
            name="categories"
            value={product.categories}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-yellow-300 shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
            placeholder="Enter category"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-700">
            Image URL
          </label>
          <input
            type="url"
            name="images"
            value={product.images}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-yellow-300 shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
            placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md shadow-md
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default Addproducts;
