import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProduct } from '../../hooks/useFetchProduct.ts';
import { useDeleteProduct } from '../../hooks/useDeleteProduct.ts';

const Product: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useFetchProduct(productId);

  const { mutate: deleteProduct } = useDeleteProduct();

  if (isLoading)
    return <div className="text-center text-lg font-semibold">로딩 중...</div>;
  if (isError || !product)
    return (
      <div className="text-center text-red-500 font-semibold">
        상품 정보를 불러올 수 없습니다.
      </div>
    );

  const handleDelete = () => {
    if (productId) {
      // 삭제 요청
      deleteProduct(productId);
    }
  };

  const handleEdit = () => {
    // 수정 페이지로 이동
    navigate(`/product/update/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-end space-x-4">
        {/* 수정 버튼 */}
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
        >
          수정
        </button>

        {/* 삭제 버튼 */}
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
        >
          삭제
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 제품 이미지 */}
        <div className="flex justify-center items-center">
          <img
            className="w-full max-w-md h-auto rounded-lg shadow-xl object-cover"
            src={
              product?.productImg
                ? product.productImg
                : 'https://i.namu.wiki/i/M9DUOeJIn3If7FU7QlF6mfB2SEF3ecNWrQk0RiC1b6w59SLthwswxt2sFO3_86gyKVEn-DknunO-6pxJcR44tg.webp'
            }
            alt={product?.name}
          />
        </div>

        {/* 제품 정보 */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {product?.name}
          </h1>
          <p className="text-lg text-gray-700 mb-6">{product?.description}</p>
          <p className="text-2xl font-semibold text-gray-900 mb-4">
            {product?.price} 원
          </p>

          {/* 카테고리 */}
          <div className="text-sm text-gray-500 mb-4">
            <span className="font-medium">카테고리:</span> {product?.category}
          </div>

          {/* 구매 버튼 */}
          <div className="mt-6 flex justify-between items-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
              장바구니에 추가
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400">
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
