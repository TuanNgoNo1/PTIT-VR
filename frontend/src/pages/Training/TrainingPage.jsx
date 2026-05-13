import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/PageHero/PageHero';
import PostSummary from '../../components/PostSummary/PostSummary';
import { fetchApi } from '../../utils/api';
import trainingPrograms from '../../data/trainingPrograms';
import '../shared/InnerPage.css';
import './TrainingPage.css';

const levels = ['Đại học chính quy', 'Sau đại học', 'Liên thông và văn bằng 2', 'Chương trình chất lượng cao và quốc tế'];

function TrainingPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetchApi('/api/posts');
        if (res && res.data) setPosts(res.data.slice(0, 4));
      } catch { /* ignore */ }
    };
    fetchPosts();
  }, []);

  return (
    <div className="inner-page">
      <PageHero
        title="Đào tạo"
        subtitle="Hơn 30 chương trình đào tạo từ Đại học, Sau đại học đến Chương trình quốc tế"
        image="https://ptit.edu.vn/wp-content/uploads/2024/09/ptit-campus.jpg"
        breadcrumbItems={[
          { label: 'Trang chủ', to: '/' },
          { label: 'Đào tạo', to: '/dao-tao' },
        ]}
      />

      <div className="container">
        <p className="inner-page__intro">
          Học viện Công nghệ Bưu chính Viễn thông đào tạo nguồn nhân lực chất lượng cao trong các lĩnh vực
          Công nghệ thông tin, Viễn thông, Điện tử, An toàn thông tin, Trí tuệ nhân tạo, Đa phương tiện,
          Quản trị kinh doanh và Marketing số. Chương trình được cập nhật liên tục theo chuẩn quốc tế
          và nhu cầu thực tiễn của doanh nghiệp.
        </p>

        {levels.map(level => {
          const programs = trainingPrograms.filter(p => p.level === level);
          if (programs.length === 0) return null;
          return (
            <section key={level} className="inner-page__section">
              <h2 className="inner-page__section-title">{level}</h2>
              <div className="inner-page__grid">
                {programs.map((prog, index) => (
                  <div key={index} className="inner-page__card">
                    <div className="training-card__meta">
                      <span className="training-card__code">{prog.code}</span>
                      <span className="training-card__duration">{prog.duration}</span>
                    </div>
                    <h3>{prog.name}</h3>
                    <p>{prog.description}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Tin tức liên quan */}
        {posts.length > 0 && (
          <section className="inner-page__section">
            <h2 className="inner-page__section-title">Tin tức đào tạo</h2>
            <div className="inner-page__posts-grid">
              {posts.map(post => <PostSummary key={post.id} {...post} />)}
            </div>
            <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
              <Link to="/tin-tuc" className="link-arrow">Xem tất cả tin tức</Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default TrainingPage;
