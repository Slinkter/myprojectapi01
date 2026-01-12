import SkeletonCard from "./SkeletonCard";

const SKELETON_COUNT = 30;

const SkeletonGrid = () => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 w-full max-w-screen-2xl p-4">
    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
      <li
        key={index}
        className="animate-skeleton-loading flex justify-center"
        style={{
          animationDelay: `${index * 150}ms`,
          animationFillMode: "backwards",
        }}
      >
        <SkeletonCard />
      </li>
    ))}
  </ul>
);

export default SkeletonGrid;
