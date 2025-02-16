import "../Styles/Skeleton.css";

const Skeleton = ({ isDark }) => {
  return (
    <div className={isDark ? "skeleton-dark" : "skeleton-container"}>
      <div className="flex items-center">
        <div className={isDark ? "skeleton-dark-mode skeleton-avatar" : "skeleton skeleton-avatar"}></div>
        <div className={isDark ? "skeleton-dark-mode skeleton-title" : "skeleton skeleton-title"}></div>
      </div>
      <div className={isDark ? "skeleton-dark-mode skeleton-text" : "skeleton skeleton-text"}></div>
    </div>
  );
};

export default Skeleton;
