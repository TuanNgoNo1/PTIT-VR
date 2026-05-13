import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/PageHero/PageHero';
import PostSummary from '../../components/PostSummary/PostSummary';
import { fetchApi } from '../../utils/api';
import { encodeCategory } from '../../utils/helpers';
import researchAreas from '../../data/researchAreas';
import '../shared/InnerPage.css';

const AREA_ICONS = ['🤖', '📡', '🔐', '💻', '📊', '🚁'];

function ResearchPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let res = await fetchApi(`/api/posts/category/${encodeCategory('Nghiên cứu khoa học')}`);
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
        title="Nghiên cứu khoa học"
        subtitle="Nghiên cứu ứng dụng và chuyển giao công nghệ trong lĩnh vực ICT"
        image="https://ptit.edu.vn/wp-content/uploads/2024/09/ptit-students.jpg"
        breadcrumbItems={[
          { label: 'Trang chủ', to: '/' },
          { label: 'Nghiên cứu khoa học', to: '/nghien-cuu' },
        ]}
      />

      <div className="container">
        <p className="inner-page__intro">
          Học viện PTIT là một trong những cơ sở nghiên cứu hàng đầu Việt Nam trong lĩnh vực ICT,
          với hàng trăm đề tài nghiên cứu cấp nhà nước, cấp bộ và hợp tác quốc tế mỗi năm.
          Các hướng nghiên cứu trọng điểm bao gồm Trí tuệ nhân tạo, Mạng 5G/6G, An ninh mạng,
          Thiết kế vi mạch bán dẫn, Khoa học dữ liệu và Robot tự hành.
        </p>

        <section className="inner-page__section">
          <h2 className="inner-page__section-title">Hướng nghiên cứu trọng điểm</h2>
          <div className="inner-page__grid">
            {researchAreas.map((area, index) => (
              <div key={index} className="inner-page__card">
                <div className="inner-page__card-icon">{AREA_ICONS[index] || '🔬'}</div>
                <h3>{area.name}</h3>
                <p>{area.description}</p>
              </div>
            ))}
          </div>
        </section>

        {posts.length > 0 && (
          <section className="inner-page__section">
            <h2 className="inner-page__section-title">Bài viết nghiên cứu</h2>
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

export default ResearchPage;
