import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/PageHero/PageHero';
import PostSummary from '../../components/PostSummary/PostSummary';
import { fetchApi } from '../../utils/api';
import { encodeCategory } from '../../utils/helpers';
import partners from '../../data/partners';
import '../shared/InnerPage.css';

function InternationalPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let res = await fetchApi(`/api/posts/category/${encodeCategory('Hợp tác quốc tế')}`);
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
        title="Hợp tác quốc tế"
        subtitle="Kết nối toàn cầu, mở rộng cơ hội học tập và nghiên cứu"
        image="https://ptit.edu.vn/wp-content/uploads/2024/09/ptit-banner.jpg"
        breadcrumbItems={[
          { label: 'Trang chủ', to: '/' },
          { label: 'Hợp tác quốc tế', to: '/hop-tac-quoc-te' },
        ]}
      />

      <div className="container">
        <p className="inner-page__intro">
          Học viện PTIT đã thiết lập quan hệ hợp tác với hơn 50 trường đại học và tổ chức nghiên cứu
          trên toàn thế giới. Các chương trình trao đổi sinh viên, nghiên cứu chung, và đào tạo liên kết
          quốc tế mang đến cơ hội tiếp cận nền giáo dục tiên tiến cho sinh viên và giảng viên.
        </p>

        <section className="inner-page__section">
          <h2 className="inner-page__section-title">Đối tác chiến lược</h2>
          <div className="inner-page__partners-grid">
            {partners.map((partner, index) => (
              <a key={index} href={partner.url} target="_blank" rel="noopener noreferrer" className="inner-page__partner-card">
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="inner-page__partner-logo"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="inner-page__partner-name">{partner.name}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="inner-page__section">
          <h2 className="inner-page__section-title">Chương trình hợp tác</h2>
          <div className="inner-page__grid">
            <div className="inner-page__card">
              <div className="inner-page__card-icon">🎓</div>
              <h3>Trao đổi sinh viên</h3>
              <p>Chương trình trao đổi ngắn hạn và dài hạn với các trường đại học đối tác tại Hàn Quốc, Nhật Bản, Úc, Pháp.</p>
            </div>
            <div className="inner-page__card">
              <div className="inner-page__card-icon">📜</div>
              <h3>Đào tạo liên kết</h3>
              <p>Chương trình cấp bằng kép với IIT Madras (Ấn Độ), UTS (Úc), Đại học Bordeaux (Pháp).</p>
            </div>
            <div className="inner-page__card">
              <div className="inner-page__card-icon">🔬</div>
              <h3>Nghiên cứu chung</h3>
              <p>Hợp tác nghiên cứu với C-DAC, NAVER, Samsung trong lĩnh vực AI, 5G, bán dẫn.</p>
            </div>
            <div className="inner-page__card">
              <div className="inner-page__card-icon">🏆</div>
              <h3>Học bổng quốc tế</h3>
              <p>Học bổng toàn phần và bán phần cho sinh viên xuất sắc tham gia chương trình quốc tế.</p>
            </div>
          </div>
        </section>

        {posts.length > 0 && (
          <section className="inner-page__section">
            <h2 className="inner-page__section-title">Tin tức hợp tác quốc tế</h2>
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

export default InternationalPage;
