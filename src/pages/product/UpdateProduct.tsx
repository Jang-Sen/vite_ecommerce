import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProduct } from '../../hooks/useFetchProduct'; // 상품 정보를 가져오는 훅
import { usePatchProduct } from '../../hooks/usePatchProduct'; // 수정 요청 훅
import { ProductInput } from '../types/product.types'; // ProductInput 타입

const UpdateProduct: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useFetchProduct(productId!); // 상품 정보 가져오기
  const { mutate: patchProduct, isLoading: isUpdating } = usePatchProduct(
    productId!
  ); // 수정 요청

  // 수정할 상품 정보 상태
  const [formData, setFormData] = useState<ProductInput>({
    name: '',
    price: 0,
    description: '',
    category: '',
    productImg: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        productImg: product.productImg || [],
      });
    }
  }, [product]);

  // 폼 입력 값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prevData) => ({
        ...prevData,
        productImg: Array.from(e.target.files).map((file) =>
          URL.createObjectURL(file)
        ),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patchProduct(formData); // 상품 수정 요청
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError || !product) {
    return <div>상품을 불러오는 데 문제가 발생했습니다.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">상품 수정</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 상품 이름 */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            상품 이름
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* 상품 가격 */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            가격
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* 상품 설명 */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            상품 설명
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleTextAreaChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            카테고리
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* 상품 이미지 */}
        <div>
          <label
            htmlFor="productImg"
            className="block text-sm font-medium text-gray-700"
          >
            상품 이미지 (선택 사항)
          </label>
          <input
            id="productImg"
            name="productImg"
            type="file"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            multiple
          />
          <div className="mt-2">
            {formData.productImg &&
              formData.productImg.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`product-img-${idx}`}
                  className="w-20 h-20 object-cover mt-2"
                />
              ))}
          </div>
        </div>

        {/* 수정 버튼 */}
        <div>
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            {isUpdating ? '수정 중...' : '수정 완료'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
