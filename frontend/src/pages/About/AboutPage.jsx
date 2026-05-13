import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { fetchApi } from '../../utils/api';
import about from '../../data/about';
import './AboutPage.css';

const sections = [
  { id: 'overview', label: 'Tổng quan', key: 'overview' },
  { id: 'history', label: 'Lịch sử phát triển', key: 'history' },
  { id: 'mission', label: 'Sứ mệnh & Tầm nhìn', key: 'mission' },
  { id: 'leadership', label: 'Ban giám đốc', key: 'leadership' },
  { id: 'organization', label: 'Cơ cấu tổ chức', key: 'organization' },
];

function AboutPage() {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetchApi('/api/posts/category/Tin%20t%E1%BB%A9c');
        if (res && res.data) {
          setRelatedPosts(res.data.slice(0, 5));
        }
      } catch {
        setRelatedPosts([]);
      }
    };
    fetchRelated();
  }, []);

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Giới thiệu', to: '/gioi-thieu' },
  ];

  return (
    <div className="about-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        <div className="about-page__layout">
          {/* Left sidebar - navigation */}
          <nav className="about-page__sidebar">
            <ul>
              {sections.map(s => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={(e) => handleAnchorClick(e, s.id)}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main content */}
          <div className="about-page__content">
            <section id="overview" className="about-page__section">
              <h2>Tổng quan</h2>
              <p>{about.overview}</p>
            </section>

            <section id="history" className="about-page__section">
              <h2>Lịch sử phát triển</h2>
              <p>{about.history}</p>
            </section>

            <section id="mission" className="about-page__section">
              <h2>Sứ mệnh & Tầm nhìn</h2>
              <p>{about.mission}</p>
            </section>

            <section id="leadership" className="about-page__section">
              <h2>Ban giám đốc</h2>
              <div className="about-page__leaders">
                {about.leadership.map((person, index) => (
                  <div key={index} className="about-page__leader-card">
                    <h4>{person.name}</h4>
                    <p>{person.title}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="organization" className="about-page__section">
              <h2>Cơ cấu tổ chức</h2>
              <p>{about.organization}</p>
            </section>
          </div>

          {/* Right sidebar - related news + banner */}
          <aside className="about-page__right-sidebar">
            <div className="about-page__related">
              <h3 className="about-page__related-title">Tin tức mới nhất</h3>
              <ul className="about-page__related-list">
                {relatedPosts.map(post => (
                  <li key={post.id} className="about-page__related-item">
                    <Link to={`/post/${post.id}`} className="about-page__related-link">
                      {post.thumbnail_url && (
                        <img src={post.thumbnail_url} alt={post.title} className="about-page__related-thumb" />
                      )}
                      <div className="about-page__related-info">
                        <span className="about-page__related-post-title">{post.title}</span>
                        <span className="about-page__related-date">{post.published_at}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-page__banner">
              <Link to="/tuyen-sinh" className="about-page__banner-link">
                <div className="about-page__banner-content">
                  <span className="about-page__banner-tag">Tuyển sinh 2026</span>
                  <h4>Đăng ký xét tuyển ngay</h4>
                  <p>7 chương trình đào tạo mới</p>
                  <span className="about-page__banner-cta">Tìm hiểu →</span>
                </div>
              </Link>
            </div>

            <div className="about-page__quick-links">
              <h3 className="about-page__related-title">Liên kết nhanh</h3>
              <ul className="about-page__quick-list">
                <li><Link to="/dao-tao">Chương trình đào tạo</Link></li>
                <li><Link to="/khoa-vien">Khoa - Viện - Trung tâm</Link></li>
                <li><Link to="/nghien-cuu">Nghiên cứu khoa học</Link></li>
                <li><Link to="/hop-tac-quoc-te">Hợp tác quốc tế</Link></li>
                <li><Link to="/lien-he">Liên hệ</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
