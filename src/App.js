import Header from "./component/layout/Header";
import "./assets/css/style.css";
import Footer from "./component/layout/Footer";

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
