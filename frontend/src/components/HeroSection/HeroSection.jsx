import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import heroSlides from '../../data/heroSlides';
import './HeroSection.css';

function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    setActiveIndex(i => (i + 1) % heroSlides.length);
  }, []);

  const goPrev = () => {
    setActiveIndex(i => (i - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="hero" aria-label="Hero banner">
      <div className="hero__slides">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero__slide ${index === activeIndex ? 'hero__slide--active' : ''}`}
            aria-hidden={index !== activeIndex}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="hero__image"
              onError={(e) => { e.target.src = '/images/banner.webp'; }}
            />
            <div className="hero__overlay" />
          </div>
        ))}
      </div>

      <div className="hero__content">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero__text ${index === activeIndex ? 'hero__text--active' : ''}`}
            aria-hidden={index !== activeIndex}
          >
            <h1 className="hero__title">{slide.title}</h1>
            <p className="hero__subtitle">{slide.subtitle}</p>
            <Link to={slide.cta.to} className="hero__cta">
              {slide.cta.label}
              <span className="hero__cta-arrow">→</span>
            </Link>
          </div>
        ))}
      </div>

      {/* Counter & Vertical Nav */}
      <div className="hero__counter">
        <span className="hero__counter-current">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="hero__counter-divider">/</span>
        <span className="hero__counter-total">{String(heroSlides.length).padStart(2, '0')}</span>
      </div>

      <div className="hero__nav">
        <button className="hero__nav-btn" onClick={goPrev} aria-label="Slide trước">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
        <button className="hero__nav-btn" onClick={goNext} aria-label="Slide tiếp theo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      <button className="hero__scroll-down" onClick={scrollDown} aria-label="Cuộn xuống">
        <span>Cuộn xuống</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </section>
  );
}

export default HeroSection;
