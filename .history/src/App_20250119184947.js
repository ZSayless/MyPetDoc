import Header from "./components/layout/Header";
import "./assets/css/style.css";
import Footer from "./components/layout/Footer";
import "aos/dist/aos.css";
import AOS from "aos";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ScrollToTop from "./components/common/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { ToastProvider } from "./context/ToastContext";
import { useTranslation } from "react-i18next";

// Import các components cũ
import Home from "./components/home/Home";
import ContactUs from "./components/contactus/ContactUs";
import AboutUs from "./components/aboutus/AboutUs";
import BlogList from "./components/blog/BlogList";
import BlogDetail from "./components/blog/BlogDetail";
import Terms from "./components/terms/Terms";

import ChangePasswordModal from "./components/setting/modals/ChangePasswordModal";
import EditSocialMediaModal from "./components/setting/modals/EditSocialMediaModal";
import EditNameModal from "./components/setting/modals/EditNameModal";
import EditAvatarModal from "./components/setting/modals/EditAvatarModal";

import HospitalDetail from "./components/hospital/HospitalDetail";
import FindHospital from "./components/hospital/FindHospital";
import WriteBlog from "./components/blog/WriteBlog";
import Profile from "./components/profile/Profile";
import AllReviews from "./components/profile/AllReviews";
import AllFavorites from "./components/profile/AllFavorites";
import CommunityList from "./components/community/CommunityList";
import PostDetail from "./components/community/PostDetail";
import AddHospital from "./components/hospital/AddHospital";
import MyBlogs from "./components/blog/MyBlogs";

// Cấu hình AOS với các options tối ưu
AOS.init({
  // Disable AOS on mobile for better performance
  disable: window.innerWidth < 768,
  // Chỉ animate một lần
  once: true,
  // Giảm thời gian animation
  duration: 600,
  // Tăng khoảng cách trigger để smooth hơn
  offset: 200,
  // Tắt mirror effect
  mirror: false,
  // Sử dụng CSS transform thay vì position
  useClassNames: true,
  // Tối ưu performance
  debounceDelay: 50,
  throttleDelay: 99,
});

function MainLayout({ children }) {
  return (
    <div className="pt-[72px]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

function App() {
  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <ToastProvider>
            <ScrollToTop />
            <Routes>
              {/* Admin Route - không có Header và Footer */}
              <Route path="/admin/*" element={<AdminDashboard />} />

              {/* Main Routes - có Header và Footer */}
              <Route
                path="/"
                element={
                  <MainLayout>
                    <Home />
                  </MainLayout>
                }
              />
              <Route
                path="/contactus"
                element={
                  <MainLayout>
                    <ContactUs />
                  </MainLayout>
                }
              />
              <Route
                path="/aboutus"
                element={
                  <MainLayout>
                    <AboutUs />
                  </MainLayout>
                }
              />
              <Route
                path="/bloglist"
                element={
                  <MainLayout>
                    <BlogList />
                  </MainLayout>
                }
              />
              <Route
                path="/blogdetail/:id"
                element={
                  <MainLayout>
                    <BlogDetail />
                  </MainLayout>
                }
              />
              <Route
                path="/write-blog"
                element={
                  <MainLayout>
                    <WriteBlog />
                  </MainLayout>
                }
              />
              <Route
                path="/community"
                element={
                  <MainLayout>
                    <CommunityList />
                  </MainLayout>
                }
              />
              <Route
                path="/community/post/:postId"
                element={
                  <MainLayout>
                    <PostDetail />
                  </MainLayout>
                }
              />
              <Route
                path="/setting"
                element={
                  <MainLayout>
                    <div className="container mx-auto px-4 py-8">
                      <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8">{t("auth.settings")}</h1>
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                          <EditNameModal />
                          <EditAvatarModal />
                          <EditSocialMediaModal />
                          <ChangePasswordModal />
                        </div>
                      </div>
                    </div>
                  </MainLayout>
                }
              />
              <Route
                path="/hospital/:id"
                element={
                  <MainLayout>
                    <HospitalDetail />
                  </MainLayout>
                }
              />
              <Route
                path="/find-hospital"
                element={
                  <MainLayout>
                    <FindHospital />
                  </MainLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                }
              />
              <Route
                path="/profile/reviews"
                element={
                  <MainLayout>
                    <AllReviews />
                  </MainLayout>
                }
              />
              <Route
                path="/profile/favorites"
                element={
                  <MainLayout>
                    <AllFavorites />
                  </MainLayout>
                }
              />
              <Route
                path="/bloglist"
                element={
                  <MainLayout>
                    <BlogList />
                  </MainLayout>
                }
              />
              <Route
                path="/bloglist/:id"
                element={
                  <MainLayout>
                    <BlogDetail />
                  </MainLayout>
                }
              />
              <Route
                path="/add-hospital"
                element={
                  <MainLayout>
                    <AddHospital />
                  </MainLayout>
                }
              />
              <Route
                path="/terms"
                element={
                  <MainLayout>
                    <Terms />
                  </MainLayout>
                }
              />
              <Route
                path="/my-blogs"
                element={
                  <MainLayout>
                    <MyBlogs />
                  </MainLayout>
                }
              />
              <Route
                path="/edit-blog/:id"
                element={
                  <MainLayout>
                    <WriteBlog />
                  </MainLayout>
                }
              />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/community/list" element={<CommunityList />} />
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
