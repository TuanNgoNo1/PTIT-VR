import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import admissionPrograms from '../../data/admissionPrograms';
import './AdmissionSection.css';

function AdmissionSection() {
  const headerRef = useScrollReveal();
  const scrollerRef = useScrollReveal({ threshold: 0.05 });

  return (
    <section className="admission-section section">
      <div className="container">
        <div className="admission-section__header scroll-reveal" ref={headerRef}>
          <h2 className="admission-section__title">Tuyển sinh</h2>
          <Link to="/tuyen-sinh" className="link-arrow">Xem tất cả</Link>
        </div>
      </div>

      <div className="container">
        <div className="admission-section__scroller scroll-reveal" ref={scrollerRef}>
          <div className="admission-section__cards">
            {admissionPrograms.map((program, index) => (
              <Link to={program.to} key={index} className="admission-card">
                <div className="admission-card__image-wrapper">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="admission-card__image"
                    onError={(e) => { e.target.src = program.fallback; }}
                  />
                  <div className="admission-card__overlay" />
                </div>
                <div className="admission-card__content">
                  <h3 className="admission-card__title">{program.title}</h3>
                  <span className="admission-card__cta">
                    Xem thêm <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdmissionSection;
