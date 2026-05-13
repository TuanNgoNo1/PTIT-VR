import React from 'react';
import { Link } from 'react-router-dom';
import './CooperationSection.css';

function CooperationSection({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <section className="cooperation-section section">
        <div className="container">
          <div className="cooperation-section__header">
            <h2 className="cooperation-section__title">Hợp tác</h2>
            <Link to="/hop-tac-quoc-te" className="link-arrow">Xem tất cả</Link>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '40px 0' }}>
            Đang tải bài viết...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="cooperation-section section">
      <div className="container">
        <div className="cooperation-section__header">
          <h2 className="cooperation-section__title">Hợp tác</h2>
          <Link to="/hop-tac-quoc-te" className="link-arrow">Xem tất cả</Link>
        </div>
      </div>

      <div className="container">
        <div className="cooperation-section__scroller">
          <div className="cooperation-section__cards">
            {posts.slice(0, 6).map(post => (
              <Link to={`/post/${post.id}`} key={post.id} className="cooperation-card">
                <div className="cooperation-card__image-wrapper">
                  <img
                    src={post.thumbnail_url || '/images/banner.webp'}
                    alt={post.title}
                    className="cooperation-card__image"
                  />
                  {post.category && (
                    <span className="cooperation-card__tag">{post.category}</span>
                  )}
                </div>
                <h3 className="cooperation-card__title">{post.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CooperationSection;
