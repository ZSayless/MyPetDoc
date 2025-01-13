import { Routes, Route } from "react-router-dom";
import Home from "./component/home/Home";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import AdminDashboard from "./pages/admin/AdminDashboard";
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
import "./assets/css/style.css";
import "aos/dist/aos.css";
import AOS from "aos";

AOS.init();

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/bloglist" element={<BlogList />} />
          <Route path="/blogdetail/:id" element={<BlogDetail />} />
          <Route path="/write-blog" element={<WriteBlog />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/community" element={<Community />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/hospital/:id" element={<HospitalDetail />} />
          <Route path="/find-hospital" element={<FindHospital />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
