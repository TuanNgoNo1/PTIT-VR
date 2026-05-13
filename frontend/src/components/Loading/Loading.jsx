import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div className="loading" aria-label="Đang tải..." role="status">
      <div className="loading__spinner"></div>
    </div>
  );
}

export default Loading;
