import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHeaderScroll } from '../../hooks/useHeaderScroll';
import SidebarMenu from './SidebarMenu';
import SearchOverlay from './SearchOverlay';
import './Header.css';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

function Header() {
  const isScrolled = useHeaderScroll(50);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // On non-home pages, always show scrolled (white bg) state
  const showScrolled = !isHome || isScrolled;

  return (
    <>
      <header className={`header ${showScrolled ? 'header--scrolled' : ''}`}>
        <div className="header__container">
          <Link to="/" className="header__logo">
            <img
              src="https://ptit.edu.vn/wp-content/uploads/2024/09/ptit-logo.png"
              alt="PTIT Logo"
              className="header__logo-icon"
            />
            <div className="header__logo-text">
              <span className="header__logo-name">HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</span>
              <span className="header__logo-sub">Posts and Telecommunications Institute of Technology</span>
            </div>
          </Link>

          <div className="header__actions">
            <Link to="/tham-quan" className="header__vr-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header__vr-icon">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              Tham quan 360°
            </Link>
            <Link to="/dao-tao" className="header__cta">Cổng đào tạo</Link>
            <button
              className="header__action-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Tìm kiếm"
            >
              <SearchIcon />
            </button>
            <button
              className="header__action-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Mở menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <SidebarMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default Header;
