import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../component/aboutus/AboutUs";
import ContactUs from "../component/contactus/ContactUs";
import Service from "../component/service/Service";
import BlogList from "../component/blog/BlogList";
import Community from "../component/community/Community";
import Setting from "../component/setting/Setting";
import Terms from "../component/terms/Terms";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/service" element={<Service />} />
      <Route path="/bloglist" element={<BlogList />} />
      <Route path="/community" element={<Community />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default AppRoutes; 