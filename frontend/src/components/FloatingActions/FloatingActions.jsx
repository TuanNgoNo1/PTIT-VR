import React, { useEffect, useState } from 'react';
import './FloatingActions.css';

function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-actions">
      <a
        href="https://m.me/ptaboratory"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-actions__btn"
        title="Nhắn tin Messenger"
        aria-label="Messenger"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.5 2 2 6.14 2 11.25c0 2.88 1.42 5.43 3.65 7.13V22l3.34-1.83c.89.25 1.83.39 2.81.39 5.5 0 10-4.14 10-9.31S17.5 2 12 2zm.97 12.55l-2.55-2.71-4.96 2.71 5.45-5.78 2.62 2.71 4.89-2.71-5.45 5.78z" />
        </svg>
      </a>

      <a
        href="tel:02433121536"
        className="floating-actions__btn"
        title="Gọi ngay"
        aria-label="Gọi điện thoại"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>

      <button
        onClick={scrollToTop}
        className={`floating-actions__btn floating-actions__btn--scroll ${showScrollTop ? 'floating-actions__btn--visible' : ''}`}
        title="Lên đầu trang"
        aria-label="Lên đầu trang"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default FloatingActions;
