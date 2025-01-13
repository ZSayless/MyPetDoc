import Header from "./component/layout/Header";
import "./assets/css/style.css";
import Footer from "./component/layout/Footer";
import "aos/dist/aos.css";
import AOS from "aos";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ScrollToTop from "./components/common/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";

// Import các components cũ
import Home from "./component/home/Home";
import ContactUs from "./component/contactus/ContactUs";
import AboutUs from "./component/aboutus/AboutUs";
import BlogList from "./component/blog/BlogList";
import BlogDetail from "./component/blog/BlogDetail";
import Terms from "./component/Terms/Terms";
import Community from "./component/community/Community";
import Setting from "./component/setting/Setting";
import HospitalDetail from "./component/hospital/HospitalDetail";
import FindHospital from "./component/hospital/FindHospital";
import WriteBlog from "./component/blog/WriteBlog";
import Profile from "./component/profile/Profile";

AOS.init();

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
              <Community />
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
      </Routes>
    </AuthProvider>
  );
}

export default App;
