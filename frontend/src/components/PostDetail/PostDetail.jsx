import React, { useState, useEffect } from "react";
import "./PostDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarDays,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

export default function PostDetail() {
  const [currentPostId, setCurrentPostId] = useState(30);
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch(`http://localhost:5000/api/posts/${currentPostId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPost(data.data);
          return fetch(
            `http://localhost:5000/api/posts/${currentPostId}/related`,
          );
        } else {
          throw new Error(data.message);
        }
      })
      .then((res) => res && res.json())
      .then((relData) => {
        if (relData && relData.success) {
          setRelatedPosts(relData.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Không thể kết nối tới Server");
        setLoading(false);
      });
  }, [currentPostId]);

  if (loading) return <div className="status-message">⏳ Đang tải...</div>;
  if (error) return <div className="status-message error">❌ {error}</div>;

  return (
    <>
      {/* BANNER HERO: Chữ nằm TRÊN ảnh */}
      <div className="ptit-hero-banner">
        <img src="/images/banner.webp" alt="Banner" className="hero-img" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{post.title}</h1>
        </div>
      </div>

      <main className="ptit-main-layout">
        <article className="ptit-article">
          {post.category !== "Sự kiện" && (
            <>
              <h1 className="article-title">{post.title}</h1>
              <div className="article-meta">
                <span>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{ color: "#bc2626" }}
                  />{" "}
                  {post.published_at}
                </span>
                <span className="meta-spacer">|</span>
                <span>
                  <FontAwesomeIcon icon={faUser} style={{ color: "#bc2626" }} />{" "}
                  {post.publisher || "PTIT"}
                </span>
                <span className="meta-spacer">|</span>
                <span>
                  <FontAwesomeIcon icon={faTag} style={{ color: "#bc2626" }} />{" "}
                  <strong className="meta-category">{post.category}</strong>
                </span>
              </div>
            </>
          )}
          <div
            className="post-content-render"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <aside className="ptit-sidebar">
          <div className="sidebar-widget">
            <h3 className="widget-title">BÀI VIẾT LIÊN QUAN</h3>
            <div className="related-list">
              {relatedPosts.map((item) => (
                <div
                  key={item.id}
                  className="related-item"
                  onClick={() => setCurrentPostId(item.id)}
                >
                  <img
                    src={item.thumbnail_url || "/images/default.jpg"}
                    className="related-thumb"
                    alt="thumb"
                  />
                  <div className="related-info">
                    <div className="related-date">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        style={{ color: "#bc2626" }}
                      />{" "}
                      {item.published_at}
                    </div>
                    <div className="related-title">{item.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
