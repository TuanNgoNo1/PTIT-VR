import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PostSummary.css';

function PostSummary({ id, title, thumbnail_url, published_at, excerpt, category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <article className="post-summary" onClick={handleClick} role="link" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleClick()}>
      {thumbnail_url && (
        <div className="post-summary__image-wrapper">
          <img
            className="post-summary__image"
            src={thumbnail_url}
            alt={title}
            loading="lazy"
          />
        </div>
      )}
      <div className="post-summary__body">
        {category && <span className="post-summary__category">{category}</span>}
        <h3 className="post-summary__title">{title}</h3>
        {excerpt && <p className="post-summary__excerpt">{excerpt}</p>}
        {published_at && <time className="post-summary__date">📅 {published_at}</time>}
      </div>
    </article>
  );
}

export default PostSummary;
