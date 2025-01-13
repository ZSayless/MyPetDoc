import Header from "./component/layout/Header";
import "./assets/css/style.css";
import Footer from "./component/layout/Footer";
import "aos/dist/aos.css";
import AOS from "aos";
import AppRoutes from "./routes";

AOS.init();

function App() {
  return (
    <div>
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
