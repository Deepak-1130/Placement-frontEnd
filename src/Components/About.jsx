export default function About() {
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