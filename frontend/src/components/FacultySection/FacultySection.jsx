import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import faculties from '../../data/faculties';
import './FacultySection.css';

const TYPE_ICONS = {
  'Khoa': '🎓',
  'Viện': '🔬',
  'Trung tâm': '💡',
};

function FacultySection() {
  const headerRef = useScrollReveal();
  const scrollerRef = useScrollReveal({ threshold: 0.05 });

  // Show each faculty name in the marquee instead of repeating one string
  const marqueeNames = faculties.map(f => f.name);

  return (
    <section className="faculty-section section">
      <div className="faculty-section__marquee">
        <div className="faculty-section__marquee-track">
          {/* First set */}
          {marqueeNames.map((name, i) => (
            <span key={`a-${i}`} className="faculty-section__marquee-text">{name}</span>
          ))}
          {/* Duplicate for seamless loop */}
          {marqueeNames.map((name, i) => (
            <span key={`b-${i}`} className="faculty-section__marquee-text">{name}</span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="faculty-section__header scroll-reveal" ref={headerRef}>
          <h2 className="faculty-section__title">Khoa - Viện thuộc PTIT</h2>
          <Link to="/khoa-vien" className="link-arrow">Xem tất cả</Link>
        </div>
      </div>

      <div className="container">
        <div className="faculty-section__scroller scroll-reveal" ref={scrollerRef}>
          <div className="faculty-section__cards">
            {faculties.map(fac => (
              <Link to={`/khoa-vien/${fac.id}`} key={fac.id} className="faculty-card">
                <div className="faculty-card__icon">
                  {TYPE_ICONS[fac.type] || '🏛️'}
                </div>
                <span className="faculty-card__type">{fac.type}</span>
                <h3 className="faculty-card__title">{fac.name}</h3>
                <p className="faculty-card__desc">{fac.summary}</p>
                <span className="faculty-card__arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FacultySection;
