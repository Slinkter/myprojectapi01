/**
 * @file UserDetailSkeleton.jsx
 * @description Loading skeleton representing the exact Swiss Grid layout for high-fidelity loading.
 */

const UserDetailSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 py-8 md:py-12 px-4 animate-pulse">
    <div className="inline-block">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-none bg-border" />
        <div className="w-20 h-4 rounded-none bg-border" />
      </div>
    </div>

    {/* Header Skeleton Block */}
    <section className="flex flex-col sm:flex-row gap-8 items-center sm:items-start p-8 border border-border bg-surface rounded-none">
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-none border border-border bg-border/30 flex-shrink-0" />
      <div className="space-y-4 sm:pt-2 w-full flex-1">
        <div className="h-10 sm:h-12 w-3/4 sm:w-1/2 bg-border rounded-none mx-auto sm:mx-0" />
        <div className="h-6 w-1/4 bg-border rounded-none opacity-70 mx-auto sm:mx-0" />
        <div className="space-y-2 pt-2 w-full">
          <div className="h-4 w-full bg-border rounded-none opacity-50" />
          <div className="h-4 w-5/6 sm:w-3/4 bg-border rounded-none opacity-50" />
        </div>
      </div>
    </section>

    {/* Grid Skeleton matching the Swiss Columns Layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="p-6 rounded-none border border-border bg-surface flex flex-col justify-between gap-4 min-h-[140px]">
          <div className="flex justify-between items-center border-b border-border pb-2 w-full">
            <div className="w-5 h-5 rounded-none bg-border" />
            <div className="w-10 h-3 rounded-none bg-border" />
          </div>
          <div className="space-y-2 mt-2">
            <div className="h-8 w-14 bg-border rounded-none" />
            <div className="h-4 w-20 bg-border rounded-none" />
          </div>
        </div>
      ))}
    </div>

    {/* Info Card Skeleton */}
    <div className="p-6 rounded-none border border-border bg-surface flex flex-col justify-between gap-4">
      <div className="border-b border-border pb-2 w-full">
        <div className="w-32 h-3.5 bg-border rounded-none" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-2">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-border rounded-none opacity-60" />
          <div className="h-5 w-24 bg-border rounded-none" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-16 bg-border rounded-none opacity-60" />
          <div className="h-5 w-24 bg-border rounded-none" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-16 bg-border rounded-none opacity-60" />
          <div className="h-5 w-24 bg-border rounded-none" />
        </div>
      </div>
    </div>

    {/* Sub-footer Skeleton Pills */}
    <footer className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-8 border-t border-border">
      <div className="h-9 w-32 bg-border rounded-none opacity-60" />
      <div className="h-9 w-40 bg-border rounded-none opacity-60" />
      <div className="h-9 w-28 bg-border rounded-none opacity-60" />
    </footer>
  </div>
);

export default UserDetailSkeleton;
