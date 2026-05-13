import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { fetchApi } from '../../utils/api';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Loading from '../../components/Loading/Loading';
import ErrorBlock from '../../components/ErrorBlock/ErrorBlock';
import NotFoundPage from '../NotFound/NotFoundPage';
import './PostDetailPage.css';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(false);
      setNotFound(false);
      const res = await fetchApi(`/api/posts/${id}`);
      if (!res || !res.data) {
        setNotFound(true);
      } else {
        setPost(res.data);
        // Fetch related
        try {
          const relRes = await fetchApi(`/api/posts/${id}/related`);
          setRelated((relRes && relRes.data) ? relRes.data.slice(0, 5) : []);
        } catch {
          setRelated([]);
        }
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <div className="container"><Loading /></div>;
  if (error) return <div className="container"><ErrorBlock onRetry={fetchPost} /></div>;
  if (notFound) return <NotFoundPage />;

  const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: post.category || 'Tin tức', to: `/tin-tuc/${encodeURIComponent(post.category || 'Tin tức')}` },
    { label: post.title, to: `/post/${id}` },
  ];

  const handleRelatedClick = (relatedId) => {
    navigate(`/post/${relatedId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="post-detail">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        <div className="post-detail__layout">
          <article className="post-detail__main">
            <h1 className="post-detail__title">{post.title}</h1>
            <div className="post-detail__meta">
              <span>{post.published_at}</span>
              {post.publisher && <span>Tác giả: {post.publisher}</span>}
              {post.category && <span>{post.category}</span>}
            </div>
            <div
              className="post-detail__content"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
            />
          </article>

          <aside className="post-detail__sidebar">
            {related.length > 0 && (
              <div className="post-detail__related">
                <h3>Bài viết liên quan</h3>
                {related.map(item => (
                  <div
                    key={item.id}
                    className="post-detail__related-item"
                    onClick={() => handleRelatedClick(item.id)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleRelatedClick(item.id)}
                  >
                    {item.thumbnail_url && (
                      <img className="post-detail__related-thumb" src={item.thumbnail_url} alt={item.title} />
                    )}
                    <span className="post-detail__related-title">{item.title}</span>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
