import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FloatingActions from '../FloatingActions/FloatingActions';
import './Layout.css';

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="layout">
      <Header />
      <main className={`layout__content ${!isHome ? 'layout__content--inner' : ''}`}>
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default Layout;
