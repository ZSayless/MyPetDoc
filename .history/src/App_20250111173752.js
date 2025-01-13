import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./component/layout/Header";
import "./assets/css/style.css";
import Footer from "./component/layout/Footer";
import "aos/dist/aos.css";
import AOS from "aos";
import AdminDashboard from "./pages/admin/AdminDashboard";
AOS.init();
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Other routes */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
