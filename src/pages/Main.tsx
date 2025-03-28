import React from 'react';

const Main: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
        Welcome to Jangwon Ecommerce!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Explore a variety of products and enjoy shopping with us.
      </p>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Featured Products
        </h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <span className="text-gray-600">Product 1</span>
            <span className="text-blue-500">$29.99</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-600">Product 2</span>
            <span className="text-blue-500">$19.99</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-600">Product 3</span>
            <span className="text-blue-500">$39.99</span>
          </li>
        </ul>
        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Main;
