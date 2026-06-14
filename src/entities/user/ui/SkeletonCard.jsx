/**
 * @file SkeletonCard.jsx
 * @description Loading placeholder card mimicking standard UserCard presentation elements for loading grids.
 */

/**
 * SkeletonCard component.
 *
 * @component
 * @returns {JSX.Element} Pulse card placeholder.
 */
const SkeletonCard = () => (
  <div className="h-full w-full max-w-full sm:max-w-[280px] mx-auto min-h-[190px] sm:min-h-[200px]">
    <div className="flex flex-col h-full w-full rounded-2xl border border-border bg-surface animate-pulse">
      <div className="pt-6 pb-2 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-border/50" />
      </div>
      <div className="px-5 pb-1 text-center space-y-1.5">
        <div className="w-20 h-3.5 rounded bg-border/50 mx-auto" />
        <div className="w-28 h-3 rounded bg-border/30 mx-auto" />
      </div>
      <div className="px-5 pb-5 pt-2 mt-auto w-full">
        <div className="w-full h-9 rounded-xl bg-border/40" />
      </div>
    </div>
  </div>
);

SkeletonCard.displayName = "SkeletonCard";

export default SkeletonCard;
