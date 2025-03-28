import React, { useState } from 'react';
import { useCreateProduct } from '../../hooks/useCreateProduct'; // 이미지 업로드 훅
import { ProductInput } from '../../types/product.types';

const CreateProduct: React.FC = () => {
  // 폼 상태 관리
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [productImg, setProductImg] = useState<File | null>(null);

  const { mutate } = useCreateProduct();

  // 이미지 업로드 처리 함수
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProductImg(file); // 첫 번째 파일만 처리
    }
  };

  // 폼 제출 처리 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 이미지 파일을 FormData에 추가
    const formData = new FormData();
    if (productImg) {
      formData.append('productImg', productImg); // 'productImg' 필드로 파일 추가
    }

    // 서버에서 이미지 URL을 받아오기
    try {
      const response = await fetch('/api/products/new', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('이미지 업로드 실패');
      }

      const { imageUrl } = await response.json(); // 서버에서 반환한 이미지 URL 받기

      // 서버로부터 받은 이미지 URL을 포함하여 ProductInput 생성
      const productData: ProductInput = {
        name,
        price,
        description,
        category,
        productImg: [imageUrl], // 서버에서 받은 이미지 URL 배열로 설정
      };

      // 제품 생성 훅 호출
      mutate(productData);
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">새로운 제품 생성</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제품 이름 */}
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700"
          >
            제품 이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* 가격 */}
        <div>
          <label
            htmlFor="price"
            className="block text-lg font-medium text-gray-700"
          >
            가격
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* 제품 설명 */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            제품 설명
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700"
          >
            카테고리
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* 이미지 업로드 */}
        <div>
          <label
            htmlFor="productImg"
            className="block text-lg font-medium text-gray-700"
          >
            제품 이미지
          </label>
          <input
            type="file"
            id="productImg"
            name="productImg"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            제품 생성
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
