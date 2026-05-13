import React from 'react';
import './ErrorBlock.css';

function ErrorBlock({ onRetry }) {
  return (
    <div className="error-block" role="alert">
      <p className="error-block__message">Đã xảy ra lỗi, vui lòng thử lại.</p>
      {onRetry && (
        <button className="error-block__btn" onClick={onRetry}>
          Thử lại
        </button>
      )}
    </div>
  );
}

export default ErrorBlock;
