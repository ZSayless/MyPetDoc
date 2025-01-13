import Header from "./component/layout/Header";
import "./assets/css/style.css";
import Footer from "./component/layout/Footer";
import "aos/dist/aos.css";
import AOS from "aos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Home from "./pages/Home";
import AboutUs from "./component/aboutus/AboutUs";
import ContactUs from "./component/contactus/ContactUs";
import BlogList from "./component/blog/BlogList";

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
    <Router>
      <Routes>
        {/* Admin Route */}
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Main Layout Routes */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
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
          path="/contactus"
          element={
            <MainLayout>
              <ContactUs />
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
        {/* Add other routes that need Header and Footer here */}
      </Routes>
    </Router>
  );
}

export default App;
