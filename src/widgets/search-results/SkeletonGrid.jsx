import SkeletonCard from "@/entities/user/ui/SkeletonCard";
import { cn, TAILWIND_STYLE_TOKENS } from "@/shared";

/**
 * @file SkeletonGrid.jsx
 * @description Layout grid composing multiple SkeletonCard instances to indicate collection loading state.
 */

/**
 * SkeletonGrid component.
 *
 * @component
 * @returns {JSX.Element} Pulse grid.
 */
const SkeletonGrid = () => (
  <div className={cn(TAILWIND_STYLE_TOKENS.stack, "py-12")}>
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  </div>
);

SkeletonGrid.displayName = "SkeletonGrid";

export default SkeletonGrid;
