import Header from "./component/layout/Header";
import "./assets/css/style.css";
import Footer from "./component/layout/Footer";
import "aos/dist/aos.css";
import AOS from "aos";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";

AOS.init();

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
