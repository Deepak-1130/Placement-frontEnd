import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LandingPage.css";

const API_BASE = "http://localhost:8080";

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className={`lp-navbar${scrolled ? " lp-navbar--scrolled" : ""}`}>
      <div className="lp-navbar__inner">
        <button className="lp-navbar__login" onClick={() => navigate("/login")}>
          Login
        </button>
        <div className="lp-navbar__logo" onClick={() => scrollTo("home")}>
          <span className="lp-navbar__hex">⬡</span>
          <span className="lp-navbar__brand">PlaceHub</span>
        </div>
        <div className="lp-navbar__links">
          {["home", "about", "companies", "contact"].map((s) => (
            <button
              key={s}
              className="lp-navbar__link"
              onClick={() => scrollTo(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate();
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const floatingCards = [
    { company: "Google", role: "SDE II", ctc: "45 LPA", color: "#4285F4", initials: "G", delay: "0s", top: "8%", right: "2%" },
    { company: "Microsoft", role: "Engineer", ctc: "38 LPA", color: "#00A4EF", initials: "M", delay: "0.5s", top: "36%", right: "10%" },
    { company: "Amazon", role: "SDE I", ctc: "32 LPA", color: "#FF9900", initials: "A", delay: "1s", top: "62%", right: "0%" },
    { company: "Infosys", role: "Analyst", ctc: "8 LPA", color: "#007CC3", initials: "I", delay: "1.5s", top: "82%", right: "14%" },
  ];

  return (
    <section id="home" className="lp-hero">
      <div className="lp-hero__bg">
        <div className="lp-orb lp-orb--1" />
        <div className="lp-orb lp-orb--2" />
        <div className="lp-orb lp-orb--3" />
        <div className="lp-grid-overlay" />
      </div>

      <div className="lp-hero__content">
        <div className="lp-hero__left">
          <div className="lp-hero__badge">
            <span className="lp-badge__dot" />
            Placement Season 2025 is Live
          </div>

          <h1 className="lp-hero__heading">
            Your Gateway to
            <br />
            <span className="lp-gradient-text">Top Placements</span>
          </h1>

          <p className="lp-hero__sub">
            Connecting students with top recruiters seamlessly. Land your dream
            job with real-time insights and smart company matching.
          </p>

          <div className="lp-hero__ctas">
            <button
              className="lp-btn lp-btn--primary"
              onClick={() => navigate("/register")}
            >
              Get Started
              <span className="lp-btn__arrow">→</span>
            </button>
            <button
              className="lp-btn lp-btn--ghost"
              onClick={() => scrollTo("companies")}
            >
              Explore Companies
            </button>
          </div>

          <div className="lp-hero__stats">
            {[
              ["500+", "Companies"],
              ["12K+", "Students Placed"],
              ["98%", "Success Rate"],
            ].map(([num, label]) => (
              <div key={label} className="lp-stat">
                <span className="lp-stat__num">{num}</span>
                <span className="lp-stat__label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-hero__right">
          <div className="lp-float-scene">
            {/* Isometric buildings */}
            <div className="lp-iso-wrap">
              <div className="lp-iso-building lp-iso-building--1">
                <div className="lp-iso-face lp-iso-face--top" />
                <div className="lp-iso-face lp-iso-face--left" />
                <div className="lp-iso-face lp-iso-face--right" />
              </div>
              <div className="lp-iso-building lp-iso-building--2">
                <div className="lp-iso-face lp-iso-face--top" />
                <div className="lp-iso-face lp-iso-face--left" />
                <div className="lp-iso-face lp-iso-face--right" />
              </div>
              <div className="lp-iso-building lp-iso-building--3">
                <div className="lp-iso-face lp-iso-face--top" />
                <div className="lp-iso-face lp-iso-face--left" />
                <div className="lp-iso-face lp-iso-face--right" />
              </div>
            </div>

            {/* Floating recruiter cards */}
            {floatingCards.map((card) => (
              <div
                key={card.company}
                className="lp-recruiter-card"
                style={{
                  "--accent": card.color,
                  "--delay": card.delay,
                  top: card.top,
                  right: card.right,
                }}
              >
                <div
                  className="lp-rc__avatar"
                  style={{ background: card.color + "22", color: card.color }}
                >
                  {card.initials}
                </div>
                <div className="lp-rc__info">
                  <div className="lp-rc__company">{card.company}</div>
                  <div className="lp-rc__role">{card.role}</div>
                </div>
                <div className="lp-rc__ctc" style={{ color: card.color }}>
                  {card.ctc}
                </div>
              </div>
            ))}

            <div className="lp-ring lp-ring--1" />
            <div className="lp-ring lp-ring--2" />
          </div>
        </div>
      </div>

      <div className="lp-hero__scroll-hint" onClick={() => scrollTo("about")}>
        <div className="lp-scroll-arrow" />
      </div>
    </section>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  const features = [
    {
      icon: "🎓",
      title: "Student Registration",
      desc: "Seamless onboarding with profile builder, resume upload, and skill tagging so recruiters find you instantly.",
      color: "#6BCB5D",
    },
    {
      icon: "🏢",
      title: "Company Listings",
      desc: "Browse hundreds of verified companies filtered by package, type, branch eligibility, and location.",
      color: "#4A9BF5",
    },
    {
      icon: "📊",
      title: "Placement Tracking",
      desc: "Real-time dashboards to monitor applications, interview rounds, offers, and placement statistics.",
      color: "#F5A623",
    },
    {
      icon: "🔔",
      title: "Smart Alerts",
      desc: "Instant notifications when a company matching your profile opens registrations or announces drive dates.",
      color: "#E05CE2",
    },
    {
      icon: "📁",
      title: "Document Vault",
      desc: "Store and share transcripts, offer letters, and certificates — everything in one secure place.",
      color: "#FF6B6B",
    },
    {
      icon: "🤝",
      title: "Recruiter Connect",
      desc: "Direct messaging channel between placement coordinators and HR teams for faster closures.",
      color: "#00C9A7",
    },
  ];

  return (
    <section id="about" className="lp-about">
      <div className="lp-section-inner">
        <div className="lp-section-tag">About the Platform</div>
        <h2 className="lp-section-heading">
          Everything Your Placement Cell Needs
        </h2>
        <p className="lp-section-sub">
          PlaceHub is a full-cycle placement management system built for
          colleges, students, and recruiters — making the entire hiring journey
          transparent, efficient, and data-driven.
        </p>

        <div className="lp-about__grid">
          {features.map((f) => (
            <div key={f.title} className="lp-feature-card">
              <div
                className="lp-feature-card__icon"
                style={{ background: f.color + "18" }}
              >
                <span style={{ fontSize: "22px" }}>{f.icon}</span>
              </div>
              <h3 className="lp-feature-card__title">{f.title}</h3>
              <p className="lp-feature-card__desc">{f.desc}</p>
              <div
                className="lp-feature-card__bar"
                style={{ background: f.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPANY CARD (uses your existing fields) ──────────────────────────────────
function CompanyCard({ company, onViewDetails }) {
  const { name, type, paid, location, branch, imageUrl } = company;
  const isIT = type?.toUpperCase() === "IT";
  const initials = name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="lp-company-card">
      <div className="lp-cc__header">
        <div className="lp-cc__logo">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="lp-cc__initials"
            style={{ display: imageUrl ? "none" : "flex" }}
          >
            {initials}
          </div>
        </div>
        <span className={`lp-badge ${isIT ? "lp-badge--it" : "lp-badge--core"}`}>
          {type}
        </span>
      </div>

      <h3 className="lp-cc__name">{name}</h3>

      <div className="lp-cc__meta">
        <div className="lp-cc__meta-item">
          <span className="lp-cc__meta-icon">💰</span>
          <span>{paid} LPA</span>
        </div>
        <div className="lp-cc__meta-item">
          <span className="lp-cc__meta-icon">📍</span>
          <span>{location}</span>
        </div>
        <div className="lp-cc__meta-item">
          <span className="lp-cc__meta-icon">🎓</span>
          <span>{branch}</span>
        </div>
      </div>

      <button
        className="lp-btn lp-btn--view"
        onClick={() => onViewDetails(company)}
      >
        View Details <span>→</span>
      </button>
    </div>
  );
}

// ─── SKELETON CARD ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="lp-company-card lp-skeleton-card">
      <div className="lp-cc__header">
        <div className="lp-skeleton lp-skeleton--logo" />
        <div className="lp-skeleton lp-skeleton--badge" />
      </div>
      <div className="lp-skeleton lp-skeleton--title" />
      <div className="lp-skeleton lp-skeleton--line" />
      <div className="lp-skeleton lp-skeleton--line" style={{ width: "70%" }} />
      <div className="lp-skeleton lp-skeleton--line" style={{ width: "55%" }} />
      <div className="lp-skeleton lp-skeleton--btn" />
    </div>
  );
}

// ─── COMPANIES SECTION ─────────────────────────────────────────────────────────
function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const navigate = useNavigate();

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/getCompany`);
      setCompanies(Array.isArray(data) ? data : []);
    } catch {
      setError(
        "Could not connect to the server. Make sure your Spring Boot backend is running on port 8080."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchByType = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/getCompanyByType/${type}`);
      setCompanies(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to filter companies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === "ALL") fetchAll();
    else fetchByType(filter);
  };

  const handleViewDetails = (company) => {
    // Navigate to your existing ShowCompany or CompanyDashboard route
    navigate(`/company/${company.id}`, { state: { company } });
  };

  return (
    <section id="companies" className="lp-companies">
      <div className="lp-section-inner">
        <div className="lp-section-tag">Company Listings</div>
        <h2 className="lp-section-heading">Explore Recruiting Companies</h2>
        <p className="lp-section-sub">
          All companies below are loaded live from our database — filter by type
          to discover the right opportunity for you.
        </p>

        {/* Filter Bar */}
        <div className="lp-filter-bar">
          {["ALL", "IT", "CORE"].map((f) => (
            <button
              key={f}
              className={`lp-filter-btn${activeFilter === f ? " lp-filter-btn--active" : ""}`}
              onClick={() => handleFilter(f)}
            >
              {f === "ALL" ? "All Companies" : f === "IT" ? "💻 IT" : "⚙️ CORE"}
            </button>
          ))}

          {/* Advanced filter link → your existing SearchFunction */}
          <button
            className="lp-filter-btn lp-filter-btn--search"
            onClick={() => navigate("/search")}
          >
            🔍 Advanced Search
          </button>
        </div>

        {/* States */}
        {loading && (
          <div className="lp-companies__grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="lp-state lp-state--error">
            <span className="lp-state__icon">⚠️</span>
            <p className="lp-state__title">Connection Error</p>
            <p className="lp-state__desc">{error}</p>
            <button
              className="lp-btn lp-btn--primary"
              onClick={() => handleFilter(activeFilter)}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && companies.length === 0 && (
          <div className="lp-state lp-state--empty">
            <span className="lp-state__icon">🏢</span>
            <p className="lp-state__title">No Companies Found</p>
            <p className="lp-state__desc">
              No companies match this filter right now. Try switching to a
              different category.
            </p>
            <button
              className="lp-btn lp-btn--ghost"
              onClick={() => handleFilter("ALL")}
            >
              Show All
            </button>
          </div>
        )}

        {!loading && !error && companies.length > 0 && (
          <>
            <div className="lp-companies__count">
              Showing <strong>{companies.length}</strong> companies
            </div>
            <div className="lp-companies__grid">
              {companies.map((c) => (
                <CompanyCard
                  key={c.id}
                  company={c}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </>
        )}

        {/* CTA to full company dashboard */}
        {!loading && !error && companies.length > 0 && (
          <div className="lp-companies__cta">
            <button
              className="lp-btn lp-btn--primary"
              onClick={() => navigate("/companies")}
            >
              View Full Dashboard →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate or wire to your backend
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="lp-contact">
      <div className="lp-section-inner lp-section-inner--narrow">
        <div className="lp-section-tag">Get in Touch</div>
        <h2 className="lp-section-heading">Contact Us</h2>
        <p className="lp-section-sub">
          Have questions? Reach out and our placement team will respond within
          24 hours.
        </p>

        <div className="lp-contact__wrap">
          <div className="lp-contact__info">
            <div className="lp-mail-icon">✉️</div>
            <div className="lp-contact__blurb">
              <h3>Placement Cell</h3>
              <p>placement@college.edu</p>
              <p>+91 98765 43210</p>
              <p>Mon – Fri, 9 AM – 5 PM</p>
            </div>
          </div>

          <div className="lp-contact__form-wrap">
            {submitted ? (
              <div className="lp-contact__success">
                <span className="lp-contact__success-icon">✅</span>
                <p>Message sent! We'll get back to you shortly.</p>
              </div>
            ) : (
              <form className="lp-contact__form" onSubmit={handleSubmit}>
                <div className="lp-field">
                  <label className="lp-field__label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="lp-field__input"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="lp-field">
                  <label className="lp-field__label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="lp-field__input"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="lp-field">
                  <label className="lp-field__label">Message</label>
                  <textarea
                    name="message"
                    className="lp-field__input lp-field__textarea"
                    placeholder="Your message..."
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`lp-btn lp-btn--primary lp-btn--full${sending ? " lp-btn--sending" : ""}`}
                  disabled={sending}
                >
                  {sending ? (
                    <span className="lp-spinner" />
                  ) : (
                    <>Send Message ✉️</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="lp-footer">
      <div className="lp-footer__inner">
        <div className="lp-footer__logo">
          <span className="lp-navbar__hex">⬡</span>
          <span className="lp-navbar__brand">PlaceHub</span>
        </div>
        <p className="lp-footer__copy">
          © {new Date().getFullYear()} PlaceHub. Built for students, by
          students.
        </p>
      </div>
    </footer>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="lp-root">
      <Navbar />
      <Hero />
      <About />
      <Companies />
      <Contact />
      <Footer />
    </div>
  );
}