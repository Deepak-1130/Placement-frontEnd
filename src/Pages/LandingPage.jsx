import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="lp-root">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
