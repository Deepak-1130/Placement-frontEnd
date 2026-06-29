export default function SkeletonCard() {
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