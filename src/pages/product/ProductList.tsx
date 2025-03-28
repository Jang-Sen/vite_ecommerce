import React, { useState } from 'react';
import { useFetchProducts } from '../../hooks/useFetchProductList.ts';
import { Link, useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<
    'createdAt_ASC' | 'createdAt_DESC' | 'price_ASC' | 'price_DESC'
  >('createdAt_DESC');
  const [page, setPage] = useState<number>(1);
  const [take, setTake] = useState<number>(10);

  const {
    data: products,
    isLoading,
    isError,
  } = useFetchProducts(keyword, sortOrder, page, take);

  const handleSearch = () => {
    setPage(1); // 검색 시 첫 페이지로 리셋
  };

  const handleNextPage = () => {
    if (products?.meta.hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (products?.meta.hasPreviousPage) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const createHandler = () => {
    navigate('/product/new');
  };

  return (
    <div className="container mx-auto p-6">
      {/* 등록 버튼 */}
      <div className="flex justify-end mb-6">
        <button
          onClick={createHandler}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          등록
        </button>
      </div>

      {/* 검색 및 필터 옵션 */}
      <div className="mb-6 flex flex-col sm:flex-row sm:space-x-4">
        {/* 검색 입력 */}
        <div className="flex-grow mb-4 sm:mb-0">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          검색
        </button>

        {/* 정렬 옵션 */}
        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(
              e.target.value as
                | 'createdAt_ASC'
                | 'createdAt_DESC'
                | 'price_ASC'
                | 'price_DESC'
            )
          }
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="createdAt_DESC">최신 등록 순</option>
          <option value="createdAt_ASC">오래된 순</option>
          <option value="price_ASC">가격 낮은 순</option>
          <option value="price_DESC">가격 높은 순</option>
        </select>

        {/* 페이지당 항목수 선택 */}
        <select
          value={take}
          onChange={(e) => setTake(Number(e.target.value))}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={10}>10개</option>
          <option value={20}>20개</option>
          <option value={30}>30개</option>
        </select>
      </div>

      {/* 로딩 중 메시지 */}
      {isLoading && <p className="text-center text-gray-500">로딩 중...</p>}

      {/* 에러 메시지 */}
      {isError && (
        <p className="text-center text-red-500">
          데이터를 불러오는 데 오류가 발생했습니다.
        </p>
      )}

      {/* 제품 목록 */}
      {products?.data && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products?.data.map((product) => (
              <div
                key={product.id}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                {/* 제품 이미지 */}
                <div className="relative pb-2/3">
                  <img
                    src={
                      product.productImg
                        ? product.productImg[0]
                        : 'https://i.namu.wiki/i/M9DUOeJIn3If7FU7QlF6mfB2SEF3ecNWrQk0RiC1b6w59SLthwswxt2sFO3_86gyKVEn-DknunO-6pxJcR44tg.webp'
                    }
                    alt={product.name}
                    className="w-full h-full object-cover absolute top-0 left-0"
                  />
                </div>

                {/* 제품 정보 */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm truncate">
                    {product.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price} 원
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      자세히 보기
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지 이동 */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePrevPage}
              disabled={!products?.meta.hasPreviousPage}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              이전
            </button>
            <button
              onClick={handleNextPage}
              disabled={!products?.meta.hasNextPage}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              다음
            </button>
          </div>

          {/* 현재 페이지 표시 */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              현재 페이지: {page} / {products?.meta.pageCount}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
