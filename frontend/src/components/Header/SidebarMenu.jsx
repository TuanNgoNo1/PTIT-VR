import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import menuItems from '../../data/menuItems';
import './SidebarMenu.css';

function SidebarMenu({ isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setActiveIndex(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const activeItem = activeIndex !== null ? menuItems[activeIndex] : null;
  const hasSubmenu = activeItem && activeItem.children && activeItem.children.length > 0;

  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? 'sidebar-backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar-menu ${isOpen ? 'sidebar-menu--open' : ''} ${hasSubmenu ? 'sidebar-menu--submenu-open' : ''}`} aria-hidden={!isOpen}>
        <button className="sidebar-menu__close" onClick={onClose} aria-label="Đóng menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="sidebar-menu__panels">
          {/* Logo top-left */}
          <div className="sidebar-menu__brand">
            <Link to="/" onClick={onClose}>
              <img
                src="https://ptit.edu.vn/wp-content/uploads/2024/09/ptit-logo.png"
                alt="PTIT"
                className="sidebar-menu__logo"
              />
            </Link>
          </div>

          {/* Main menu list */}
          <nav className="sidebar-menu__main">
            <ul className="sidebar-menu__list">
              {menuItems.map((item, index) => {
                const hasChildren = item.children && item.children.length > 0;
                const isActive = activeIndex === index;
                return (
                  <li key={index} className="sidebar-menu__item">
                    {hasChildren ? (
                      <button
                        type="button"
                        className={`sidebar-menu__link ${isActive ? 'sidebar-menu__link--active' : ''}`}
                        onClick={() => setActiveIndex(isActive ? null : index)}
                        onMouseEnter={() => setActiveIndex(index)}
                      >
                        <span>{item.label}</span>
                        <span className="sidebar-menu__arrow">→</span>
                      </button>
                    ) : (
                      <Link
                        to={item.to}
                        className="sidebar-menu__link"
                        onClick={onClose}
                        onMouseEnter={() => setActiveIndex(null)}
                      >
                        <span>{item.label}</span>
                        {item.external && <span className="sidebar-menu__arrow">↗</span>}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="sidebar-menu__socials">
              <a href="https://facebook.com/ptaboratory" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
              </a>
              <a href="https://youtube.com/@ptit" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.582 6.186a2.506 2.506 0 0 0-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418A2.506 2.506 0 0 0 2.418 6.186C2 7.746 2 12 2 12s0 4.254.418 5.814a2.506 2.506 0 0 0 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418a2.506 2.506 0 0 0 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM10 15.464V8.536L16 12l-6 3.464z" /></svg>
              </a>
            </div>
          </nav>

          {/* Submenu column */}
          <div className="sidebar-menu__submenu">
            {activeItem && activeItem.children && (
              <ul className="sidebar-menu__sublist">
                {activeItem.children.map((child, childIndex) => (
                  <li key={childIndex} style={{ animationDelay: `${childIndex * 0.05}s` }}>
                    <Link to={child.to} className="sidebar-menu__sublink" onClick={onClose}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Image on the far right */}
          <div className="sidebar-menu__image">
            <img
              src="https://ptit.edu.vn/wp-content/uploads/2024/09/ptit-campus.jpg"
              alt="Khuôn viên PTIT"
              onError={(e) => { e.target.src = '/images/banner.webp'; }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}

export default SidebarMenu;
