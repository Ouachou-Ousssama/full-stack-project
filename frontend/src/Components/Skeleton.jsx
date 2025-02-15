import "../Styles/Skeleton.css";

const Skeleton = () => {
  return (
    <div class="skeleton-container">
      <div className="flex items-center"> 
        <div class="skeleton skeleton-avatar"></div>
        <div class="skeleton skeleton-title ml-3 translate-y-[-5px]"></div>
      </div>
      <div class="skeleton skeleton-text"></div>
    </div>
  );
};

export default Skeleton;
