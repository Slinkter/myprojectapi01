/**
 * @file SkeletonCard.jsx
 * @description Card loading skeleton matching the size, padding, and rounding of the new premium cards.
 */

const SkeletonCard = () => (
  <div className="h-full w-full max-w-full sm:max-w-[280px] mx-auto min-h-[210px] sm:min-h-[220px]">
    <div className="flex flex-col h-full w-full rounded-lg border border-app-border bg-app-surface/40 backdrop-blur-xl animate-pulse">
      <div className="pt-5 pb-2.5 flex flex-col items-center">
        <div className="w-16 h-16 rounded-lg bg-app-border" />
      </div>
      <div className="px-4 pb-2 text-center space-y-1.5">
        <div className="w-24 h-4 rounded bg-app-border mx-auto" />
        <div className="w-32 h-3 rounded bg-app-border mx-auto opacity-50" />
      </div>
      <div className="px-4 pb-4 pt-1 mt-auto w-full">
        <div className="w-full h-8 rounded-lg bg-app-border" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
