import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchProduct } from '../../hooks/useFetchProduct.ts';

const Product: React.FC = () => {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useFetchProduct(productId);

  if (isLoading)
    return <div className="text-center text-lg font-semibold">로딩 중...</div>;
  if (isError || !product)
    return (
      <div className="text-center text-red-500 font-semibold">
        상품 정보를 불러올 수 없습니다.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 제품 이미지 */}
        <div className="flex justify-center">
          <img
            className="w-full max-w-md h-auto rounded-lg shadow-lg"
            src={
              product?.productImg
                ? product.productImg
                : 'https://i.namu.wiki/i/M9DUOeJIn3If7FU7QlF6mfB2SEF3ecNWrQk0RiC1b6w59SLthwswxt2sFO3_86gyKVEn-DknunO-6pxJcR44tg.webp'
            }
            alt={product?.name}
          />
        </div>

        {/* 제품 정보 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
          <p className="text-gray-600 text-lg">{product?.description}</p>
          <p className="text-xl font-bold mt-4">{product?.price}원</p>
          <p className="text-sm text-gray-500 mt-2">
            카테고리: {product?.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
