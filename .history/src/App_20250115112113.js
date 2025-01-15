import Header from "./components/common/Header";
import "./assets/css/style.css";
import Footer from "./components/common/Footer";
import "aos/dist/aos.css";
import AOS from "aos";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/admin/AdminDashboard";
import ScrollToTop from "./components/common/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Import các components cũ
import Home from "./component/home/Home";
import ContactUs from "./component/contactus/ContactUs";
import AboutUs from "./component/aboutus/AboutUs";
import BlogList from "./components/blog/BlogList";
import BlogDetail from "./components/blog/BlogDetail";
import Terms from "./component/Terms/Terms";
import Community from "./component/community/Community";
import Setting from "./component/setting/Setting";
import HospitalDetail from "./component/hospital/HospitalDetail";
import FindHospital from "./component/hospital/FindHospital";
import WriteBlog from "./components/blog/WriteBlog";
import Profile from "./component/profile/Profile";
import AllReviews from "./component/profile/AllReviews";
import AllFavorites from "./component/profile/AllFavorites";
import CommunityList from "./components/community/CommunityList";
import PostDetail from "./components/community/PostDetail";

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
  return (
    <Provider store={store}>
      <AuthProvider>
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
            path="/terms"
            element={
              <MainLayout>
                <Terms />
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
                <Setting />
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
        </Routes>
      </AuthProvider>
    </Provider>
  );
}

export default App;
