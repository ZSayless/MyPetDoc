import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import ScrollToTop from "./components/common/ScrollToTop";
import WriteBlog from "./component/blog/WriteBlog";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <App>
        <Routes>
          <Route index path="/" element={<Home />} />
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
      </App>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
