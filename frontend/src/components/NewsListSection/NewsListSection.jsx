import React from 'react';
import { Link } from 'react-router-dom';
import './NewsListSection.css';

function NewsListSection({ posts }) {
  if (!posts || posts.length === 0) {
    // Show placeholder when no data (backend not running)
    return (
      <section className="news-section section">
        <div className="container">
          <div className="news-section__header">
            <h2 className="news-section__title">Tin tức và sự kiện</h2>
            <Link to="/tin-tuc" className="link-arrow">Xem tất cả</Link>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '40px 0' }}>
            Đang tải tin tức... Vui lòng đảm bảo Backend đang chạy tại port 5000.
          </p>
        </div>
      </section>
    );
  }

  const featuredPosts = posts.slice(0, 3);
  const listPosts = posts.slice(3, 8);

  return (
    <section className="news-section section">
      <div className="container">
        <div className="news-section__header">
          <h2 className="news-section__title">Tin tức và sự kiện</h2>
          <Link to="/tin-tuc" className="link-arrow">Xem tất cả</Link>
        </div>

        {/* Featured cards grid */}
        <div className="news-section__cards">
          {featuredPosts.map((post, index) => (
            <Link to={`/post/${post.id}`} key={post.id} className={`news-card ${index === 0 ? 'news-card--large' : ''}`}>
              <div className="news-card__image-wrapper">
                <img
                  src={post.thumbnail_url || '/images/banner.webp'}
                  alt={post.title}
                  className="news-card__image"
                  loading="lazy"
                />
                {post.category && (
                  <span className="news-card__category">{post.category}</span>
                )}
              </div>
              <div className="news-card__body">
                <h3 className="news-card__title">{post.title}</h3>
                {post.excerpt && <p className="news-card__excerpt">{post.excerpt}</p>}
                <span className="news-card__date">{post.published_at}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* List below */}
        {listPosts.length > 0 && (
          <div className="news-section__list">
            {listPosts.map(post => (
              <Link to={`/post/${post.id}`} key={post.id} className="news-list-item">
                <span className="news-list-item__date">{post.published_at}</span>
                <div className="news-list-item__main">
                  <h4 className="news-list-item__title">{post.title}</h4>
                  {post.category && <span className="news-list-item__category">{post.category}</span>}
                </div>
                <span className="news-list-item__arrow">→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsListSection;
