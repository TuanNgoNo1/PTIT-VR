import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import quickLinks from '../../data/quickLinks';
import './PortalSection.css';

function PortalSection() {
  const ref = useScrollReveal();

  return (
    <section className="portal-section section">
      <div className="container">
        <h2 className="portal-section__title">Cổng thông tin</h2>
        <div className="portal-section__grid scroll-reveal" ref={ref}>
          {quickLinks.map((link, index) => (
            <Link to={link.to} key={index} className="portal-card">
              <span className="portal-card__icon">{link.icon}</span>
              <span className="portal-card__label">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortalSection;
