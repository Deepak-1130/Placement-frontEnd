import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Companies", path: "/companies" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path;
  };

  return (
    <nav className={`lp-navbar${scrolled ? " lp-navbar--scrolled" : ""}`}>
      <div className="lp-navbar__inner">
        <div className="lp-navbar__logo" onClick={() => navigate("/")}>
          <span className="lp-navbar__hex">⬡</span>
          <span className="lp-navbar__brand">PlaceHub</span>
        </div>
        <div className="lp-navbar__links">
          {navLinks.map(({ label, path }) => (
            <button
              key={path}
              className={`lp-navbar__link${isActive(path) ? " lp-navbar__link--active" : ""}`}
              onClick={() => navigate(path)}
            >
              {label}
            </button>
          ))}
        </div>
        <button className="lp-navbar__login" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </nav>
  );
}
