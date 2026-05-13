import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchApi } from '../../utils/api';
import PostSummary from '../../components/PostSummary/PostSummary';
import Loading from '../../components/Loading/Loading';
import ErrorBlock from '../../components/ErrorBlock/ErrorBlock';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { filterPosts, sortByDate } from './searchUtils';
import './SearchPage.css';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetchApi('/api/posts');
      setAllPosts((res && res.data) ? res.data : []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
    }
  };

  const trimmedQuery = query.trim();
  const filtered = filterPosts(allPosts, trimmedQuery);
  const sorted = sortByDate(filtered);

  const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Tìm kiếm', to: '/search' },
  ];

  return (
    <div className="search-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        <form className="search-page__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-page__input"
            placeholder="Nhập từ khóa tìm kiếm..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="search-page__btn">Tìm kiếm</button>
        </form>

        {loading && <Loading />}
        {error && <ErrorBlock onRetry={fetchAllPosts} />}

        {!loading && !error && (
          <>
            {!trimmedQuery && (
              <p className="search-page__message">Vui lòng nhập từ khóa tìm kiếm.</p>
            )}
            {trimmedQuery && sorted.length === 0 && (
              <p className="search-page__message">Không tìm thấy kết quả cho "{trimmedQuery}".</p>
            )}
            {trimmedQuery && sorted.length > 0 && (
              <>
                <p className="search-page__count">Tìm thấy {sorted.length} kết quả cho "{trimmedQuery}"</p>
                <div className="search-page__results">
                  {sorted.map(post => (
                    <PostSummary key={post.id} {...post} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
