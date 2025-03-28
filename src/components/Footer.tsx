import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* 회사 정보 */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div>
            <h3 className="text-xl font-semibold">Jangwon E-commerce</h3>
            <p className="text-gray-400 mt-2">서울시 노원구</p>
            <p className="text-gray-400">전화: 010-9511-0662</p>
          </div>

          {/* 소셜 미디어 링크 */}
          <div className="mt-6 sm:mt-0">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-facebook-square text-2xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* 링크 섹션 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="font-semibold text-gray-300">고객 지원</h5>
            <ul className="mt-4">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-300">회사</h5>
            <ul className="mt-4">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  회사 소개
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  이용 약관
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">
                  개인정보 처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 정보 */}
        <div className="text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Jangwon E-commerce. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
