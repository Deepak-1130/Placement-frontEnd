import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
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