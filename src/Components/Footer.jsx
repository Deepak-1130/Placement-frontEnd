export default function Footer() {
  return (
    <footer className="lp-footer">
      <div className="lp-footer__inner">
        <div className="lp-footer__logo">
          {/* <span className="lp-navbar__hex">⬡</span> */}
          {/* <span className="lp-navbar__brand">PlaceHub</span> */}
        </div>
        <p className="lp-footer__copy">
          © {new Date().getFullYear()} Department of  Training and Placement, ACGCET
        </p>
      </div>
    </footer>
  );
}