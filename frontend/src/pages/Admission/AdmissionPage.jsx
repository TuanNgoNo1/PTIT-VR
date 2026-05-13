import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/api';
import { encodeCategory } from '../../utils/helpers';
import PageHero from '../../components/PageHero/PageHero';
import PostSummary from '../../components/PostSummary/PostSummary';
import Loading from '../../components/Loading/Loading';
import ErrorBlock from '../../components/ErrorBlock/ErrorBlock';
import admissionMethods from '../../data/admissionMethods';
import admissionScores from '../../data/admissionScores';
import '../shared/InnerPage.css';
import './AdmissionPage.css';

const METHOD_ICONS = ['📝', '📋', '🎯', '🏅', '🔗'];

function AdmissionPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true); setError(false);
      let res = await fetchApi(`/api/posts/category/${encodeCategory('Tuyển sinh')}`);
      if (!res || !res.data || res.data.length === 0) {
        res = await fetchApi('/api/posts');
      }
      setPosts((res && res.data) ? res.data.slice(0, 6) : []);
    } catch { setError(true); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <div className="inner-page">
      <PageHero
        title="Tuyển sinh"
        subtitle="Thông tin tuyển sinh, phương thức xét tuyển và điểm chuẩn các năm"
        image="https://ptit.edu.vn/wp-content/uploads/2024/09/ptit-students.jpg"
        breadcrumbItems={[
          { label: 'Trang chủ', to: '/' },
          { label: 'Tuyển sinh', to: '/tuyen-sinh' },
        ]}
      />

      <div className="container">
        {/* Phương thức xét tuyển */}
        <section className="inner-page__section" id="phuong-thuc">
          <h2 className="inner-page__section-title">Phương thức xét tuyển</h2>
          <div className="admission-methods-grid">
            {admissionMethods.map((method, i) => (
              <div key={i} className="admission-method-card">
                <div className="admission-method-card__header">
                  <span className="admission-method-card__icon">{METHOD_ICONS[i] || '📌'}</span>
                  <span className="admission-method-card__number">0{i + 1}</span>
                </div>
                <h3 className="admission-method-card__title">{method.name}</h3>
                <p className="admission-method-card__desc">{method.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Điểm chuẩn */}
        <section className="inner-page__section" id="diem-chuan">
          <h2 className="inner-page__section-title">Điểm chuẩn các năm</h2>
          <div className="admission-scores-wrapper">
            <table className="admission-table">
              <thead>
                <tr><th>Ngành đào tạo</th><th>Điểm chuẩn</th></tr>
              </thead>
              <tbody>
                {admissionScores.map(yearData => (
                  <React.Fragment key={yearData.year}>
                    <tr className="admission-table__year">
                      <td colSpan={2}>Năm {yearData.year}</td>
                    </tr>
                    {yearData.programs.map((prog, i) => (
                      <tr key={i}>
                        <td>{prog.name}</td>
                        <td><span className="admission-table__score">{prog.score}</span></td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Thông báo tuyển sinh */}
        <section className="inner-page__section">
          <h2 className="inner-page__section-title">Thông báo tuyển sinh</h2>
          {loading && <Loading />}
          {error && <ErrorBlock onRetry={fetchPosts} />}
          {!loading && !error && posts.length > 0 && (
            <div className="inner-page__posts-grid">
              {posts.map(post => <PostSummary key={post.id} {...post} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdmissionPage;
