import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchOverlay.css';

function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      onClose();
    }
  };

  return (
    <div className={`search-overlay ${isOpen ? 'search-overlay--open' : ''}`}>
      <button className="search-overlay__close" onClick={onClose} aria-label="Đóng tìm kiếm">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="search-overlay__content">
        <h2 className="search-overlay__title">Bạn đang tìm kiếm gì?</h2>
        <form className="search-overlay__form" onSubmit={handleSubmit}>
          <svg className="search-overlay__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="search-overlay__input"
            placeholder="Nhập từ khóa tìm kiếm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <p className="search-overlay__hint">Nhấn Enter để tìm kiếm hoặc ESC để đóng</p>
      </div>
    </div>
  );
}

export default SearchOverlay;
