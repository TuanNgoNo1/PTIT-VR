import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './HeroCarousel.css';

function HeroCarousel({ posts, autoPlayMs = 5000 }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    setActiveIndex(i => (i + 1) % posts.length);
  }, [posts.length]);

  const goPrev = () => {
    setActiveIndex(i => (i - 1 + posts.length) % posts.length);
  };

  useEffect(() => {
    if (!posts || posts.length <= 1) return;
    const timer = setInterval(goNext, autoPlayMs);
    return () => clearInterval(timer);
  }, [goNext, autoPlayMs, posts]);

  if (!posts || posts.length === 0) return null;

  return (
    <div className="hero-carousel" aria-label="Tin nổi bật">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={`hero-carousel__slide ${index === activeIndex ? 'hero-carousel__slide--active' : ''}`}
          aria-hidden={index !== activeIndex}
        >
          <Link to={`/post/${post.id}`} className="hero-carousel__link">
            <img
              className="hero-carousel__image"
              src={post.thumbnail_url || '/images/banner.webp'}
              alt={post.title}
            />
            <div className="hero-carousel__overlay">
              {post.category && (
                <span className="hero-carousel__category">{post.category}</span>
              )}
              <h2 className="hero-carousel__title">{post.title}</h2>
              {post.excerpt && (
                <p className="hero-carousel__excerpt">{post.excerpt}</p>
              )}
              <span className="hero-carousel__date">📅 {post.published_at}</span>
            </div>
          </Link>
        </div>
      ))}

      {posts.length > 1 && (
        <>
          <button
            className="hero-carousel__nav hero-carousel__nav--prev"
            onClick={goPrev}
            aria-label="Bài trước"
          >
            ‹
          </button>
          <button
            className="hero-carousel__nav hero-carousel__nav--next"
            onClick={goNext}
            aria-label="Bài tiếp theo"
          >
            ›
          </button>

          <div className="hero-carousel__dots">
            {posts.map((_, index) => (
              <button
                key={index}
                className={`hero-carousel__dot ${index === activeIndex ? 'hero-carousel__dot--active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Chuyển đến bài ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HeroCarousel;
