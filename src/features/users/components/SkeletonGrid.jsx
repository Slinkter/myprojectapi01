/**
 * @file Skeleton Grid Component
 * @description
 * Loading state component that displays a grid of skeleton cards.
 * Provides visual feedback while user data is being fetched.
 */

import SkeletonCard from "./SkeletonCard";

/**
 * Number of skeleton cards to display during loading
 * @constant {number}
 */
const SKELETON_COUNT = 30;

/**
 * Skeleton Grid Component (Synchronized with UserList)
 */
const SkeletonGrid = () => (
  <div className="layout-stack py-12">
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
      {Array.from({ length: 12 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  </div>
);

export default SkeletonGrid;
