import "../StyleSheets/About.css";

export default function About() {
  const features = [
    {
      title: "Student Registration",
      desc: "Profile creation, resume upload, and eligibility tracking.",
      color: "#22c55e",
    },
    {
      title: "Company Listings",
      desc: "Explore verified recruiters with eligibility criteria.",
      color: "#2563eb",
    },
    {
      title: "Placement Tracking",
      desc: "Monitor applications, interviews, and offers in one place.",
      color: "#f59e0b",
    },
    {
      title: "Alerts & Updates",
      desc: "Never miss placement drives or important announcements.",
      color: "#8b5cf6",
    },
    {
      title: "Document Management",
      desc: "Securely manage resumes, offer letters, and certificates.",
      color: "#ef4444",
    },
    {
      title: "Recruiter Communication",
      desc: "Seamless interaction between students and recruiters.",
      color: "#14b8a6",
    },
  ];

  const recruiters = [
    "Zoho",
    "Larsen & Toubro",
    "Android",
    "Lucas TVS",
    "TCS",
    "Infosys",
    "Cognizant",
    "HCL",
  ];

  const drives = [
    {
      company: "Zoho Corporation",
      role: "Software Developer Intern",
      date: "18 Aug 2026",
      type: "Internship",
    },
    {
      company: "Larsen & Toubro",
      role: "Graduate Engineer Trainee",
      date: "24 Aug 2026",
      type: "Placement",
    },
    {
      company: "Lucas TVS",
      role: "Design Engineer",
      date: "30 Aug 2026",
      type: "Placement",
    },
  ];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <span className="about-tag">ABOUT THE PLATFORM</span>
        <h1>Placement Management Simplified</h1>
        <p>
          A modern placement portal connecting students, recruiters, and the
          institution through a transparent and efficient placement process.
        </p>
      </section>

      {/* Features */}
      <section className="about-features">
        <h2>What the Portal Offers</h2>

        <div className="feature-grid">
          {features.map((item) => (
            <div className="feature-card" key={item.title}>
              <div
                className="feature-icon"
                style={{ background: item.color + "20" }}
              />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span
                className="feature-line"
                style={{ background: item.color }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Placement Cell */}
      <section className="placement-cell">
        <div className="placement-content">
          <span className="section-label">PLACEMENT CELL</span>

          <h2>About ACGCET Placement Cell</h2>

          <p>
            The <strong>ACGCET Placement Cell</strong> is instrumental in
            facilitating students' transition from academics to successful
            careers. Through strategic collaboration with industry leaders, the
            placement cell secures internships and full-time opportunities while
            providing valuable industry exposure.
          </p>

          <p>
            Dedicated placement coordinators mentor students in resume building,
            aptitude preparation, communication, and interview skills, ensuring
            graduates across every department are career-ready and confident.
          </p>

          <div className="placement-highlights">
            <div className="highlight-card">
              <h3>300+</h3>
              <span>Students Placed</span>
            </div>

            <div className="highlight-card">
              <h3>70+</h3>
              <span>Recruiting Companies</span>
            </div>

            <div className="highlight-card">
              <h3>₹18 LPA</h3>
              <span>Highest Package</span>
            </div>

            <div className="highlight-card">
              <h3>95%</h3>
              <span>Placement Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiters */}
      <section className="recruiters-section">
        <div className="section-header">
          <span className="section-label">OUR RECRUITERS</span>
          <h2>Trusted by Leading Companies</h2>
          <p>
            Our students are recruited by organizations across IT, Core
            Engineering, Manufacturing, and Product Development.
          </p>
        </div>

        <div className="recruiter-grid">
          {recruiters.map((company) => (
            <div className="recruiter-card" key={company}>
              <div className="recruiter-logo">
                {company.charAt(0)}
              </div>
              <h3>{company}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Drives */}
      <section className="drives-section">
        <div className="section-header">
          <span className="section-label">UPCOMING EVENTS</span>
          <h2>Next Placement Drives</h2>
          <p>
            Stay updated with the latest recruitment opportunities and campus
            hiring schedules.
          </p>
        </div>

        <div className="drives-list">
          {drives.map((drive, index) => (
            <div className="drive-card" key={index}>
              <div className="drive-date">
                <span>{drive.date}</span>
              </div>

              <div className="drive-info">
                <h3>{drive.company}</h3>
                <p>{drive.role}</p>
              </div>

              <span
                className={
                  drive.type === "Placement"
                    ? "drive-type placement"
                    : "drive-type internship"
                }
              >
                {drive.type}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}