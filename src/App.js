import { Helmet } from "react-helmet";
import Header from "./components/layout/Header";
import "./assets/css/style.css";
import Footer from "./components/layout/Footer";
import "aos/dist/aos.css";
import AOS from "aos";
import { Routes, Route, useLocation } from "react-router-dom";
import AdminDashboard from "./components/admin/AdminDashboard";
import ScrollToTop from "./components/common/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastProvider } from "./context/ToastContext";
import FAQBubble from "./components/faq/FAQBubble";

// Import các components
import Home from "./components/home/Home";
import ContactUs from "./components/contactus/ContactUs";
import AboutUs from "./components/aboutus/AboutUs";
import BlogList from "./components/blog/BlogList";
import BlogDetail from "./components/blog/BlogDetail";
import Terms from "./components/terms/Terms";
import Setting from "./components/setting/Setting";
import HospitalDetail from "./components/hospital/HospitalDetail";
import FindHospital from "./components/hospital/FindHospital";
import Profile from "./components/profile/Profile";
import AllReviews from "./components/profile/AllReviews";
import AllFavorites from "./components/profile/AllFavorites";
// import CommunityList from "./components/community/CommunityList";
import PostDetail from "./components/community/PostDetail";
import AddHospital from "./components/hospital/AddHospital";
import ResetPassword from "./components/resetpassword/ResetPassword";
import AuthCallback from "./components/auth/AuthCallback";
import AuthError from "./components/auth/AuthError";
import SelectRole from "./components/auth/SelectRole";
import VerifyEmail from "./components/register/VerifyEmail";
import Lucete from "./components/lucete/lucete";
import ManageHospital from "./components/hospital/ManageHospital";

// Cấu hình AOS
AOS.init({
  disable: window.innerWidth < 768,
  once: true,
  duration: 600,
  offset: 200,
  mirror: false,
  useClassNames: true,
  debounceDelay: 50,
  throttleDelay: 99,
});

function MainLayout({ children }) {
  const location = useLocation();
  const canonicalUrl = `https://mypetdoc.vn${location.pathname}`;

  return (
    <div className="pt-[72px]">
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:url" content={canonicalUrl} />
      </Helmet>
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
        <ToastProvider>
          <Helmet>
            <title>MyPetDoc - Nền tảng tìm kiếm phòng khám thú y</title>
            <meta name="description" content="Tìm kiếm phòng khám thú y uy tín, đặt lịch khám và tư vấn trực tuyến cho thú cưng của bạn." />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="MyPetDoc" />
            <link rel="canonical" href="https://mypetdoc.vn" />
          </Helmet>
          <ScrollToTop />
          <Routes>
            {/* Admin Route */}
            <Route path="/admin/*" element={<AdminDashboard />} />

            {/* Main Routes */}
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
              path="/blog/:slug"
              element={
                <MainLayout>
                  <BlogDetail />
                </MainLayout>
              }
            />
            {/* <Route
              path="/community"
              element={
                <MainLayout>
                  <CommunityList />
                </MainLayout>
              }
            /> */}
            <Route
              path="/community/post/:slug"
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
              path="/hospital/:slug"
              element={
                <MainLayout>
                  <HospitalDetail />
                </MainLayout>
              }
            />
            <Route
              path="/manage-hospital"
              element={
                <MainLayout>
                  <ManageHospital />
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
              path="/reset-password/:token"
              element={
                <MainLayout>
                  <ResetPassword />
                </MainLayout>
              }
            />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/auth/error" element={<AuthError />} />
            <Route path="/auth/select-role" element={<SelectRole />} />
            <Route path="/auth/verify-email/:token" element={<VerifyEmail />} />
            <Route
              path="/contact-us"
              element={
                <MainLayout>
                  <ContactUs />
                </MainLayout>
              }
            />
            <Route
              path="/lucete"
              element={
                <MainLayout>
                  <Lucete />
                </MainLayout>
              }
            />
          </Routes>
          <FAQBubble />
        </ToastProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
