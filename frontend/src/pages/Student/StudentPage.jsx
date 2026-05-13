import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/PageHero/PageHero';
import PostSummary from '../../components/PostSummary/PostSummary';
import { fetchApi } from '../../utils/api';
import { encodeCategory } from '../../utils/helpers';
import studentLinks from '../../data/studentLinks';
import '../shared/InnerPage.css';
import './StudentPage.css';

function StudentPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let res = await fetchApi(`/api/posts/category/${encodeCategory('Sinh viên')}`);
        if (!res || !res.data || res.data.length === 0) {
          res = await fetchApi('/api/posts');
        }
        if (res && res.data) setPosts(res.data.slice(0, 6));
      } catch { /* ignore */ }
    };
    fetchPosts();
  }, []);

  return (
    <div className="inner-page">
      <PageHero
        title="Sinh viên"
        subtitle="Hoạt động, học bổng, đoàn hội và cựu sinh viên PTIT"
        image="https://ptit.edu.vn/wp-content/uploads/2024/09/ptit-students.jpg"
        breadcrumbItems={[
          { label: 'Trang chủ', to: '/' },
          { label: 'Sinh viên', to: '/sinh-vien' },
        ]}
      />

      <div className="container">
        {/* Highlights */}
        <section className="inner-page__section" id="hoc-bong">
          <h2 className="inner-page__section-title">Đời sống sinh viên</h2>
          <div className="student-highlights">
            <div className="student-highlight-card">
              <div className="student-highlight-card__icon">🏆</div>
              <h3>Học bổng & Hỗ trợ</h3>
              <p>Hơn 500 suất học bổng mỗi năm từ Học viện và doanh nghiệp đối tác (Samsung, Viettel, FPT...)</p>
            </div>
            <div className="student-highlight-card">
              <div className="student-highlight-card__icon">🎭</div>
              <h3>CLB & Hoạt động</h3>
              <p>30+ câu lạc bộ học thuật, thể thao, nghệ thuật. Các cuộc thi lập trình ICPC, Hackathon, Robocon.</p>
            </div>
            <div className="student-highlight-card" id="doan-hoi">
              <div className="student-highlight-card__icon">🤝</div>
              <h3>Đoàn - Hội Sinh viên</h3>
              <p>Đoàn Thanh niên và Hội Sinh viên PTIT tổ chức các hoạt động tình nguyện, mùa hè xanh, hiến máu.</p>
            </div>
            <div className="student-highlight-card" id="cuu-sv">
              <div className="student-highlight-card__icon">🌟</div>
              <h3>Cựu sinh viên</h3>
              <p>Mạng lưới 50.000+ cựu sinh viên làm việc tại các tập đoàn công nghệ hàng đầu trong và ngoài nước.</p>
            </div>
          </div>
        </section>

        {/* Quick links */}
        <section className="inner-page__section">
          <h2 className="inner-page__section-title">Liên kết tiện ích</h2>
          <div className="student-links-grid">
            {studentLinks.map((link, i) => (
              <a key={i} href={link.href} target={link.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="student-link-card">
                <span className="student-link-card__arrow">→</span>
                <span className="student-link-card__label">{link.label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* News */}
        {posts.length > 0 && (
          <section className="inner-page__section">
            <h2 className="inner-page__section-title">Tin tức sinh viên</h2>
            <div className="inner-page__posts-grid">
              {posts.map(post => <PostSummary key={post.id} {...post} />)}
            </div>
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link to="/tin-tuc" className="link-arrow">Xem tất cả</Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default StudentPage;
