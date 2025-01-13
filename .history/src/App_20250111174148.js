import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import AdminDashboard from "./pages/admin/AdminDashboard";
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
