import React from 'react';
import partners from '../../data/partners';
import './PartnersSection.css';

function PartnersSection() {
  // Duplicate for seamless marquee loop
  const doubledPartners = [...partners, ...partners];

  return (
    <section className="partners-section section">
      <div className="container">
        <h2 className="partners-section__title">Đối tác chiến lược</h2>
        <p className="partners-section__subtitle">
          Hợp tác với các tập đoàn công nghệ và trường đại học hàng đầu thế giới
        </p>
      </div>

      <div className="partners-section__marquee">
        <div className="partners-section__track">
          {doubledPartners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="partners-section__item"
              title={partner.name}
            >
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="partners-section__logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span class="partners-section__fallback">${partner.name}</span>`;
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;
