import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/api';
import { encodeCategory } from '../../utils/helpers';
import HeroSection from '../../components/HeroSection/HeroSection';
import AboutSection from '../../components/AboutSection/AboutSection';
import FacultySection from '../../components/FacultySection/FacultySection';
import AdmissionSection from '../../components/AdmissionSection/AdmissionSection';
import PortalSection from '../../components/PortalSection/PortalSection';
import NewsListSection from '../../components/NewsListSection/NewsListSection';
import CooperationSection from '../../components/CooperationSection/CooperationSection';
import PartnersSection from '../../components/PartnersSection/PartnersSection';

function HomePage() {
  const [allPosts, setAllPosts] = useState([]);
  const [news, setNews] = useState([]);
  const [cooperation, setCooperation] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetchApi('/api/posts');
        const posts = (res && res.data) ? res.data : [];
        setAllPosts(posts);
        // Split by category
        setNews(posts.filter(p => p.category === 'Tin tức').slice(0, 8));
        setCooperation(posts.slice(0, 6));
      } catch {
        setAllPosts([]);
      }
    };

    const fetchByCategory = async (category, setter) => {
      try {
        const res = await fetchApi(`/api/posts/category/${encodeCategory(category)}`);
        if (res && res.data && res.data.length > 0) {
          setter(res.data);
        }
      } catch {
        // keep fallback
      }
    };

    fetchAll();
    fetchByCategory('Tin tức', setNews);
    fetchByCategory('Hợp tác quốc tế', setCooperation);
  }, []);

  // Fallback: use allPosts if specific categories are empty
  const newsPosts = news.length > 0 ? news : allPosts.slice(0, 8);
  const cooperationPosts = cooperation.length > 0 ? cooperation : allPosts.slice(0, 6);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <FacultySection />
      <AdmissionSection />
      <PortalSection />
      <NewsListSection posts={newsPosts} />
      <CooperationSection posts={cooperationPosts} />
      <PartnersSection />
    </>
  );
}

export default HomePage;
