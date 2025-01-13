import Header from "./component/layout/Header";
import "./assets/css/style.css";
import Footer from "./component/layout/Footer";
import "aos/dist/aos.css";
import AOS from "aos";
import Community from "./component/community/Community";
import { Routes, Route } from "react-router-dom";
AOS.init();
function App(props) {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/community" element={<Community />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
