import Navbar from "../Components/Navbar";
import About from "../Components/About";
import Footer from "../Components/Footer";
import "./LandingPage.css";

export default function AboutPage() {
  return (
    <div className="lp-root">
      <Navbar />
      <About />
      <Footer />
    </div>
  );
}
