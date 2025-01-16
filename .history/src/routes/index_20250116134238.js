import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../components/common/Loading';

// Lazy load tất cả các pages và components lớn
const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
const Contact = React.lazy(() => import('../pages/Contact'));
const Profile = React.lazy(() => import('../components/profile/Profile'));
const Setting = React.lazy(() => import('../components/setting/Setting'));
const BlogList = React.lazy(() => import('../components/blog/BlogList'));
const BlogDetail = React.lazy(() => import('../components/blog/BlogDetail')); 
const WriteBlog = React.lazy(() => import('../components/blog/WriteBlog'));
const MyBlogs = React.lazy(() => import('../components/blog/MyBlogs'));

function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/write-blog" element={<WriteBlog />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes; 