import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404 - Không tìm thấy trang</h1>
      <p>Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
      <Link to="/">Về trang chủ</Link>
    </div>
  );
}

export default NotFoundPage;
