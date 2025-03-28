import React, { useState } from 'react';
import { useFetchProducts } from '../../hooks/useFetchProductList.ts';
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);

  const {
    data: products,
    isLoading,
    error,
    isError,
  } = useFetchProducts(sort, order, page, take);

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">제품 목록</h2>

      {/* 제품 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.data?.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              className="w-full h-48 object-cover"
              src={
                product.productImg
                  ? product.productImg
                  : 'https://i.namu.wiki/i/M9DUOeJIn3If7FU7QlF6mfB2SEF3ecNWrQk0RiC1b6w59SLthwswxt2sFO3_86gyKVEn-DknunO-6pxJcR44tg.webp'
              }
              alt={product.name}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm truncate">
                {product.description}
              </p>
              <p className="text-lg font-bold mt-2">{product.price}원</p>
              <Link
                to={`/product/${product.id}`}
                className="block mt-4 text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                상세보기
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
