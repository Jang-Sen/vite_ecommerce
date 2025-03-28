import React from 'react';
import Header from './Header.tsx';
import { Outlet } from 'react-router-dom';
import Footer from './Footer.tsx';

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
