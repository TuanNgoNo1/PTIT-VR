import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { fetchApi } from '../../utils/api';
import { encodeCategory, decodeCategory } from '../../utils/helpers';
import PostSummary from '../../components/PostSummary/PostSummary';
import Pagination from '../../components/Pagination/Pagination';
import { getPageItems, getTotalPages } from '../../components/Pagination/paginationUtils';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Loading from '../../components/Loading/Loading';
import ErrorBlock from '../../components/ErrorBlock/ErrorBlock';
import { getDistinctCategories } from './newsUtils';
import './NewsPage.css';

function NewsPage() {
  const { categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const decodedCategory = categoryName ? decodeCategory(categoryName) : null;

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(false);
      let res;
      if (decodedCategory) {
        res = await fetchApi(`/api/posts/category/${encodeCategory(decodedCategory)}`);
      } else {
        res = await fetchApi('/api/posts');
      }
      setPosts((res && res.data) ? res.data : []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  const totalPages = getTotalPages(posts.length, 10);
  const pageItems = getPageItems(posts, currentPage, 10);
  const categories = getDistinctCategories(posts);

  const handlePageChange = (page) => {
    setSearchParams({ page: String(page) });
  };

  const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Tin tức', to: '/tin-tuc' },
  ];
  if (decodedCategory) {
    breadcrumbItems.push({ label: decodedCategory, to: `/tin-tuc/${categoryName}` });
  }

  return (
    <div className="news-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        <div className="news-page__layout">
          <div className="news-page__main">
            {loading && <Loading />}
            {error && <ErrorBlock onRetry={fetchPosts} />}
            {!loading && !error && posts.length === 0 && (
              <p className="news-page__empty">Không có bài viết nào trong danh mục này.</p>
            )}
            {!loading && !error && posts.length > 0 && (
              <>
                <div className="news-page__grid">
                  {pageItems.map(post => (
                    <PostSummary key={post.id} {...post} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>

          <aside className="news-page__sidebar">
            <h3>Danh mục</h3>
            <ul>
              <li><Link to="/tin-tuc">Tất cả</Link></li>
              {categories.map((cat, index) => (
                <li key={index}>
                  <Link to={`/tin-tuc/${encodeCategory(cat)}`}>{cat}</Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
