/**
 * @file Skeleton Card Component (Minimalist Refactor)
 */

const SkeletonCard = () => (
  <div className="h-full w-full max-w-full sm:max-w-[280px] mx-auto min-h-[280px] sm:min-h-[300px]">
    <div className="flex flex-col h-full w-full rounded-xl border border-app-border bg-app-surface animate-pulse">
      <div className="pt-6 pb-4 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-app-border" />
      </div>
      <div className="px-6 pb-6 text-center space-y-1">
        <div className="w-24 h-5 rounded bg-app-border mx-auto" />
        <div className="w-32 h-3 rounded bg-app-border mx-auto opacity-50" />
      </div>
      <div className="px-6 pb-6 pt-2 mt-auto w-full">
        <div className="w-full h-9 rounded bg-app-border" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
