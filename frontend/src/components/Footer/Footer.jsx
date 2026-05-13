import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="container">
          {/* Top: Logo + Name + Socials */}
          <div className="footer__top">
            <div className="footer__brand">
              <img
                src="https://ptit.edu.vn/wp-content/uploads/2024/09/ptit-logo.png"
                alt="PTIT"
                className="footer__logo"
              />
              <div>
                <h3 className="footer__brand-name">Học viện Công nghệ Bưu chính Viễn thông</h3>
                <p className="footer__brand-sub">Posts and Telecommunications Institute of Technology</p>
              </div>
            </div>
            <div className="footer__top-socials">
              <a href="https://facebook.com/ptaboratory" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
              </a>
              <a href="https://youtube.com/@ptit" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.582 6.186a2.506 2.506 0 0 0-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418A2.506 2.506 0 0 0 2.418 6.186C2 7.746 2 12 2 12s0 4.254.418 5.814a2.506 2.506 0 0 0 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418a2.506 2.506 0 0 0 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM10 15.464V8.536L16 12l-6 3.464z" /></svg>
              </a>
            </div>
          </div>

          {/* Contact info */}
          <div className="footer__campuses">
            <div className="footer__campus">
              <span className="footer__campus-label">Trụ sở chính</span>
              Số 122 Hoàng Quốc Việt, phường Nghĩa Đô, thành phố Hà Nội.
            </div>
            <div className="footer__campus">
              <span className="footer__campus-label">Học viện cơ sở tại TP. Hồ Chí Minh</span>
              Số 11 Nguyễn Đình Chiểu, phường Sài Gòn, Thành phố Hồ Chí Minh.
            </div>
            <div className="footer__campus">
              <span className="footer__campus-label">Email</span>
              ctsv@ptit.edu.vn
            </div>
            <div className="footer__campus">
              <span className="footer__campus-label">Cơ sở đào tạo tại Hà Nội</span>
              Số 96A Trần Phú, phường Hà Đông, thành phố Hà Nội.
            </div>
            <div className="footer__campus">
              <span className="footer__campus-label">Cơ sở đào tạo tại TP Hồ Chí Minh</span>
              Số 97 Man Thiện, Tăng Nhơn Phú, thành phố Hồ Chí Minh.
            </div>
          </div>

          {/* Đường dẫn liên kết */}
          <h4 className="footer__links-title">Đường dẫn liên kết</h4>
          <div className="footer__columns">
            <div>
              <ul className="footer__column-list">
                <li><a href="https://www.most.gov.vn" target="_blank" rel="noopener noreferrer">Bộ Khoa học và Công nghệ</a></li>
                <li><a href="https://www.vast.gov.vn" target="_blank" rel="noopener noreferrer">Viện Khoa học Kỹ thuật Bưu điện</a></li>
                <li><a href="https://vnpost.vn" target="_blank" rel="noopener noreferrer">Viện Kinh tế Bưu điện</a></li>
                <li><a href="https://www.cdit.edu.vn" target="_blank" rel="noopener noreferrer">Viện Công nghệ Thông tin và Truyền thông CDIT</a></li>
              </ul>
            </div>
            <div>
              <ul className="footer__column-list">
                <li><Link to="/lien-he">Học viện Cơ sở TP. Hồ Chí Minh</Link></li>
                <li><Link to="/dao-tao">Trung tâm Đào tạo Bưu chính Viễn thông</Link></li>
                <li><Link to="/hop-tac-quoc-te">Trung tâm Đào tạo quốc tế</Link></li>
              </ul>
            </div>
            <div>
              <ul className="footer__column-list">
                <li><Link to="/dao-tao">Cổng thông tin Đào tạo</Link></li>
                <li><Link to="/nghien-cuu">Cổng thông tin Khoa học Công nghệ</Link></li>
                <li><Link to="/hop-tac-quoc-te">Cổng thông tin Hợp tác quốc tế</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-container">
          <p className="footer__copyright">
            © Copyright {year} HocVienCongNgheBuuChinhVienThong. All rights reserved ® Học viện Công nghệ Bưu chính Viễn thông giữ bản quyền nội dung trên website này
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
