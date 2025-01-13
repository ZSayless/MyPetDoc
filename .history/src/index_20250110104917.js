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


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/bloglist" element={<BlogList />} />
          <Route path="/blogdetail/:id" element={<BlogDetail />} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/community" element={<Community />} />
        
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
