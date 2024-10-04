// src/components/ProductForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../features/product/productSlice';

const ProductForm = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateProduct({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, product]);
    console.log('Submitted Data:', submittedData);
  };

  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">ID</label>
        <input
          type="text"
          name="id"
          value={product.id}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Brand</label>
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Sub Category</label>
        <input
          type="text"
          name="sub_category"
          value={product.sub_category}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <input
          type="text"
          name="gender"
          value={product.gender}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      {/* Add more fields similarly */}
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
