import Header from "./component/layout/Header";
import "./assets/css/style.css";
import Footer from "./component/layout/Footer";
import "aos/dist/aos.css";
import AOS from "aos";
import Community from "./component/community/Community";
import { Routes, Route } from "react-router-dom";
import AboutUs from "./component/aboutus/AboutUs";

AOS.init();
function App(props) {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<AboutUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/community" element={<Community />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
