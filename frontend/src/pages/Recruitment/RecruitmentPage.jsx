import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/PageHero/PageHero';
import PostSummary from '../../components/PostSummary/PostSummary';
import { fetchApi } from '../../utils/api';
import { encodeCategory } from '../../utils/helpers';
import recruitment from '../../data/recruitment';
import '../shared/InnerPage.css';
import './RecruitmentPage.css';

const jobPositions = [
  { dept: 'Khoa CNTT 1', title: 'Giảng viên Công nghệ phần mềm', type: 'Toàn thời gian', level: 'Thạc sĩ trở lên', desc: 'Giảng dạy các môn Kỹ thuật phần mềm, Lập trình hướng đối tượng, DevOps.' },
  { dept: 'Khoa CNTT 2', title: 'Giảng viên Trí tuệ nhân tạo', type: 'Toàn thời gian', level: 'Tiến sĩ', desc: 'Giảng dạy và nghiên cứu Machine Learning, Deep Learning, NLP.' },
  { dept: 'Khoa Viễn thông', title: 'Giảng viên Mạng 5G/6G', type: 'Toàn thời gian', level: 'Tiến sĩ', desc: 'Nghiên cứu và giảng dạy kiến trúc mạng thế hệ mới, truyền thông vệ tinh.' },
  { dept: 'Khoa Điện tử', title: 'Giảng viên Thiết kế vi mạch', type: 'Toàn thời gian', level: 'Thạc sĩ trở lên', desc: 'Giảng dạy thiết kế chip, FPGA, hệ thống nhúng.' },
  { dept: 'Phòng CNTT', title: 'Chuyên viên Quản trị hệ thống', type: 'Toàn thời gian', level: 'Cử nhân', desc: 'Quản trị server, mạng nội bộ, hệ thống email và website Học viện.' },
  { dept: 'TT Đổi mới sáng tạo', title: 'Chuyên viên Hỗ trợ khởi nghiệp', type: 'Toàn thời gian', level: 'Cử nhân', desc: 'Hỗ trợ các nhóm startup sinh viên, tổ chức workshop, kết nối doanh nghiệp.' },
];

function RecruitmentPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let res = await fetchApi(`/api/posts/category/${encodeCategory('Tuyển dụng')}`);
        if (!res || !res.data || res.data.length === 0) {
          res = await fetchApi('/api/posts');
        }
        if (res && res.data) setPosts(res.data.slice(0, 4));
      } catch { /* ignore */ }
    };
    fetchPosts();
  }, []);

  return (
    <div className="inner-page">
      <PageHero
        title="Tuyển dụng"
        subtitle="Gia nhập đội ngũ giảng viên và cán bộ Học viện PTIT"
        image="https://ptit.edu.vn/wp-content/uploads/2024/09/ptit-campus.jpg"
        breadcrumbItems={[
          { label: 'Trang chủ', to: '/' },
          { label: 'Tuyển dụng', to: '/tuyen-dung' },
        ]}
      />

      <div className="container">
        <p className="inner-page__intro">
          Học viện Công nghệ Bưu chính Viễn thông luôn tìm kiếm những giảng viên, nghiên cứu sinh
          và cán bộ tài năng, nhiệt huyết để cùng xây dựng môi trường giáo dục chất lượng cao.
          Chúng tôi cung cấp môi trường làm việc chuyên nghiệp, cơ hội nghiên cứu quốc tế
          và chế độ đãi ngộ cạnh tranh.
        </p>

        {/* Quy trình */}
        <section className="inner-page__section">
          <h2 className="inner-page__section-title">Quy trình ứng tuyển</h2>
          <div className="recruitment-steps">
            {recruitment.steps.map(step => (
              <div key={step.order} className="recruitment-step">
                <div className="recruitment-step__number">{step.order}</div>
                <div className="recruitment-step__content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vị trí tuyển dụng */}
        <section className="inner-page__section">
          <h2 className="inner-page__section-title">Vị trí đang tuyển</h2>
          <div className="recruitment-positions">
            {jobPositions.map((job, index) => (
              <div key={index} className="recruitment-position">
                <div className="recruitment-position__dept">{job.dept}</div>
                <h3>{job.title}</h3>
                <div className="recruitment-position__meta">
                  <span className="recruitment-position__tag">{job.type}</span>
                  <span className="recruitment-position__tag">{job.level}</span>
                </div>
                <p>{job.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tin tức */}
        {posts.length > 0 && (
          <section className="inner-page__section">
            <h2 className="inner-page__section-title">Thông báo tuyển dụng</h2>
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

export default RecruitmentPage;
