import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import './PageHero.css';

function PageHero({ title, subtitle, image, breadcrumbItems }) {
  return (
    <div className="page-hero">
      <div className="page-hero__bg">
        <img
          src={image || '/images/banner.webp'}
          alt={title}
          className="page-hero__image"
          onError={(e) => { e.target.src = '/images/banner.webp'; }}
        />
        <div className="page-hero__overlay" />
      </div>
      <div className="container page-hero__content">
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

export default PageHero;
