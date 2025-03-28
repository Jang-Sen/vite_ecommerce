import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-12">
        {/* 로고 */}
        <div className="text-white text-3xl font-bold">
          <Link to="/">Jangwon E-commerce</Link>
        </div>

        {/* 내비게이션 */}
        <nav className="hidden sm:flex space-x-8">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            홈
          </Link>
          <Link
            to="/products"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            제품
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            회사 소개
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            문의하기
          </Link>
        </nav>

        {/* 검색바 */}
        <div className="relative flex items-center">
          <input
            type="text"
            className="p-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="검색"
          />
          <span className="absolute left-3 text-gray-500">🔍</span>
        </div>

        {/* 장바구니 아이콘 */}
        <div className="relative">
          <Link to="/cart" className="text-white text-2xl">
            🛒
          </Link>
          {/* 장바구니 아이콘 옆에 숫자 표시 (예시) */}
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            3
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
