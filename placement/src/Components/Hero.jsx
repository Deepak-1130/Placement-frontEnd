import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const floatingCards = [
    { company: "Google", role: "SDE II", ctc: "45 LPA", color: "#4285F4", initials: "G", delay: "0s", top: "6%", left: "55%" },
    { company: "Microsoft", role: "Engineer", ctc: "38 LPA", color: "#00A4EF", initials: "M", delay: "0.5s", top: "30%", left: "20%" },
    { company: "Amazon", role: "SDE I", ctc: "32 LPA", color: "#FF9900", initials: "A", delay: "1s", top: "56%", left: "48%" },
    { company: "Infosys", role: "Analyst", ctc: "8 LPA", color: "#007CC3", initials: "I", delay: "1.5s", top: "76%", left: "10%" },
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
              onClick={() => navigate("/companies")}
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

            {floatingCards.map((card) => (
              <div
                key={card.company}
                className="lp-recruiter-card"
                style={{
                  "--accent": card.color,
                  "--delay": card.delay,
                  top: card.top,
                  left: card.left,
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

    </section>
  );
}