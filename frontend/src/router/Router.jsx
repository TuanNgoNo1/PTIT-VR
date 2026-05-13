import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/Home/HomePage';
import AboutPage from '../pages/About/AboutPage';
import NewsPage from '../pages/News/NewsPage';
import TrainingPage from '../pages/Training/TrainingPage';
import AdmissionPage from '../pages/Admission/AdmissionPage';
import FacultyListPage from '../pages/Faculty/FacultyListPage';
import FacultyDetailPage from '../pages/Faculty/FacultyDetailPage';
import ResearchPage from '../pages/Research/ResearchPage';
import InternationalPage from '../pages/International/InternationalPage';
import StudentPage from '../pages/Student/StudentPage';
import RecruitmentPage from '../pages/Recruitment/RecruitmentPage';
import ContactPage from '../pages/Contact/ContactPage';
import SearchPage from '../pages/Search/SearchPage';
import PostDetailPage from '../pages/PostDetail/PostDetailPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import VirtualTourPage from '../pages/VirtualTour/VirtualTourPage';

function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<AboutPage />} />
        <Route path="/tin-tuc" element={<NewsPage />} />
        <Route path="/tin-tuc/:categoryName" element={<NewsPage />} />
        <Route path="/dao-tao" element={<TrainingPage />} />
        <Route path="/tuyen-sinh" element={<AdmissionPage />} />
        <Route path="/khoa-vien" element={<FacultyListPage />} />
        <Route path="/khoa-vien/:facultyId" element={<FacultyDetailPage />} />
        <Route path="/nghien-cuu" element={<ResearchPage />} />
        <Route path="/hop-tac-quoc-te" element={<InternationalPage />} />
        <Route path="/sinh-vien" element={<StudentPage />} />
        <Route path="/tuyen-dung" element={<RecruitmentPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/tham-quan" element={<VirtualTourPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
