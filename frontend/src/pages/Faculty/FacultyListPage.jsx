import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import faculties from '../../data/faculties';
import trainingPrograms from '../../data/trainingPrograms';
import './Faculty.css';

const ICONS = {
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  ),
  signal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
      <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
      <line x1="12" y1="20" x2="12.01" y2="20"></line>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="M9 12l2 2 4-4"></path>
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0-4 4 4 4 0 0 0 2.5 3.7A4 4 0 0 0 9 19h6a4 4 0 0 0 2.5-4.3A4 4 0 0 0 20 11a4 4 0 0 0-4-4V6a4 4 0 0 0-4-4z"></path>
      <path d="M12 2v20"></path>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
      <line x1="2" y1="20" x2="22" y2="20"></line>
    </svg>
  ),
  media: (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
  ),
  business: (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  ),
  marketing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  ),
};

function ProgramIcon({ type }) {
  return ICONS[type] || ICONS.code;
}

function FacultyListPage() {
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Khoa - Viện - Trung tâm', to: '/khoa-vien' },
  ];

  return (
    <div className="faculty-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        {/* Tổ hợp xét tuyển */}
        <div className="faculty-page__admission-info">
          <div className="faculty-page__admission-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <div>
            <span className="faculty-page__admission-label">Tổ hợp xét tuyển</span>
            <span className="faculty-page__admission-codes">A00, A01, X06, X26, D01</span>
          </div>
        </div>

        {/* Danh sách ngành đào tạo */}
        <section className="faculty-page__programs-section">
          <h2 className="faculty-page__section-title">Ngành đào tạo</h2>
          <div className="faculty-page__programs-grid">
            {trainingPrograms.filter(p => p.level === 'Đại học chính quy').map((prog, index) => (
              <div key={index} className="program-card">
                <div className="program-card__icon">
                  <ProgramIcon type={prog.icon} />
                </div>
                <h3 className="program-card__name">{prog.name}</h3>
                <span className="program-card__code">Mã ngành: {prog.code}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Danh sách Khoa - Viện */}
        <section className="faculty-page__units-section">
          <h2 className="faculty-page__section-title">Các đơn vị đào tạo</h2>
          <div className="faculty-page__grid">
            {faculties.map(fac => (
              <div
                key={fac.id}
                className="faculty-page__card"
                onClick={() => navigate(`/khoa-vien/${fac.id}`)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/khoa-vien/${fac.id}`)}
              >
                <div className="faculty-page__card-type">{fac.type}</div>
                <h3>{fac.name}</h3>
                <p>{fac.summary}</p>
                {fac.programs && fac.programs.length > 0 && (
                  <div className="faculty-page__card-programs">
                    {fac.programs.slice(0, 3).map((prog, i) => (
                      <span key={i} className="faculty-page__card-program-tag">{prog}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FacultyListPage;
