import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

function Breadcrumb({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && <span className="breadcrumb__separator">/</span>}
            <span className={`breadcrumb__item ${isLast ? 'breadcrumb__item--current' : ''}`}>
              {isLast ? (
                <span>{item.label}</span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
            </span>
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
