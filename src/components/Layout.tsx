// src/components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="container mt-4">
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
