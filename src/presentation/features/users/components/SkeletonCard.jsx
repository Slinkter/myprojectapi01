/**
 * @file SkeletonCard.jsx
 * @description Card loading skeleton matching the size, padding, and rounding of the new premium cards.
 */

const SkeletonCard = () => (
  <div className="h-full w-full max-w-full sm:max-w-[280px] mx-auto min-h-[300px] sm:min-h-[320px]">
    <div className="flex flex-col h-full w-full rounded-lg border border-app-border bg-app-surface/40 backdrop-blur-xl animate-pulse">
      <div className="pt-8 pb-5 flex flex-col items-center">
        <div className="w-24 h-24 rounded-lg bg-app-border" />
      </div>
      <div className="px-6 pb-6 text-center space-y-2">
        <div className="w-28 h-5 rounded bg-app-border mx-auto" />
        <div className="w-36 h-3.5 rounded bg-app-border mx-auto opacity-50" />
      </div>
      <div className="px-6 pb-6 pt-2 mt-auto w-full">
        <div className="w-full h-10 rounded-lg bg-app-border" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
