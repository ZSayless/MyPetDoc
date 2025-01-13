import Header from "./component/layout/Header";
import "./assets/css/style.css";
import Footer from "./component/layout/Footer";
import "aos/dist/aos.css";
import AOS from "aos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
AOS.init();
function App(props) {
  return (
    <Router>
      <ScrollToTop />
      <div className="pt-[72px]">
        <Header />
        {props.children}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
