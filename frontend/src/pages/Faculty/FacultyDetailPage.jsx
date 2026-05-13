import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import faculties from '../../data/faculties';
import NotFoundPage from '../NotFound/NotFoundPage';
import './Faculty.css';

function FacultyDetailPage() {
  const { facultyId } = useParams();
  const faculty = faculties.find(f => f.id === facultyId);

  if (!faculty) return <NotFoundPage />;

  const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Khoa - Viện - Trung tâm', to: '/khoa-vien' },
    { label: faculty.name, to: `/khoa-vien/${facultyId}` },
  ];

  return (
    <div className="faculty-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
        <div className="faculty-detail">
          <h1>{faculty.name}</h1>
          <div className="faculty-detail__type">{faculty.type}</div>
          <p className="faculty-detail__desc">{faculty.description}</p>

          {faculty.programs && faculty.programs.length > 0 && (
            <div className="faculty-detail__section">
              <h3>Chương trình đào tạo</h3>
              <ul className="faculty-detail__programs">
                {faculty.programs.map((prog, i) => <li key={i}>{prog}</li>)}
              </ul>
            </div>
          )}

          {faculty.contact && (
            <div className="faculty-detail__section">
              <h3>Liên hệ</h3>
              <div className="faculty-detail__contact">
                <p>Điện thoại: {faculty.contact.phone}</p>
                <p>Email: {faculty.contact.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacultyDetailPage;
