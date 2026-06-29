import Navbar from "../Components/Navbar";
import Companies from "../Components/Companies";
import Footer from "../Components/Footer";
import "./LandingPage.css";

export default function CompaniesPage() {
  return (
    <div className="lp-root">
      <Navbar />
      <Companies />
      <Footer />
    </div>
  );
}
