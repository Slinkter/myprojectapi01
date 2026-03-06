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
 * Skeleton Grid Component
 *
 * @component
 * @description
 * Renders a responsive grid of skeleton cards during data loading.
 * Implements staggered animations for smooth visual appearance.
 *
 * Features:
 * - Displays 30 skeleton cards
 * - Responsive grid layout (matches UserList)
 * - Staggered fade-in animations (150ms delay between cards)
 * - Same grid structure as UserList for consistent layout
 *
 * Grid Breakpoints:
 * - Mobile: 1 column
 * - Small: 2 columns
 * - Medium: 3 columns
 * - Large/XL: 4 columns
 *
 * @returns {JSX.Element} Grid of skeleton loading cards
 *
 * @example
 * // Displayed while users are loading
 * {status === 'loading' && <SkeletonGrid />}
 */
const SkeletonGrid = () => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-screen-2xl mx-auto">
    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
      <li
        key={index}
        className="animate-skeleton-loading"
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
