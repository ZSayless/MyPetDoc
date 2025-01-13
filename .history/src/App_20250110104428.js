import Header from "./component/layout/Header";
import "./assets/css/style.css";
import Footer from "./component/layout/Footer";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

// Khởi tạo AOS trong component
useEffect(() => {
  AOS.init();
}, []);

function App(props) {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default App;
