import React from 'react';
import { Link } from 'react-router-dom';
import { useCountUp } from '../../hooks/useCountUp';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import aboutStats from '../../data/aboutStats';
import './AboutSection.css';

function StatItem({ number, label, suffix }) {
  const [value, ref] = useCountUp(number, 2000);
  return (
    <div className="about__stat" ref={ref}>
      <div className="about__stat-number">
        {value.toLocaleString('vi-VN')}{suffix}
      </div>
      <div className="about__stat-label">{label}</div>
    </div>
  );
}

function AboutSection() {
  const headerRef = useScrollReveal();
  const imageRef = useScrollReveal({ threshold: 0.2 });
  const statsRef = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="about section">
      <div className="container">
        <div className="about__header scroll-reveal" ref={headerRef}>
          <h2 className="about__title">Chúng tôi - PTIT</h2>
          <p className="about__description">
            Học viện Công nghệ Bưu chính Viễn thông (PTIT) là một trong những cơ sở đào tạo hàng đầu Việt Nam
            về Công nghệ thông tin, Viễn thông và các lĩnh vực ICT. Với lịch sử hơn 70 năm phát triển,
            PTIT đã đào tạo hàng chục nghìn kỹ sư, chuyên gia chất lượng cao cho ngành công nghệ và đất nước.
          </p>
          <Link to="/gioi-thieu" className="link-arrow">
            Xem thêm
          </Link>
        </div>

        <div className="about__image-wrapper scroll-reveal" ref={imageRef}>
          <div className="img-zoom-wrapper about__image">
            <img
              src="https://ptit.edu.vn/wp-content/uploads/2024/09/ptit-campus.jpg"
              alt="Khuôn viên PTIT"
              onError={(e) => { e.target.src = '/images/banner.webp'; }}
            />
          </div>
          <div className="about__logo-overlay">
            <img
              src="https://ptit.edu.vn/wp-content/uploads/2024/09/ptit-logo.png"
              alt="PTIT Logo"
              className="about__logo-spin"
            />
          </div>
        </div>

        <div className="about__stats scroll-reveal" ref={statsRef}>
          {aboutStats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
