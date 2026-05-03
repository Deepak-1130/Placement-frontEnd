import Navbar from "../Components/Navbar";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import "./LandingPage.css";

export default function ContactPage() {
  return (
    <div className="lp-root">
      <Navbar />
      <Contact />
      <Footer />
    </div>
  );
}
