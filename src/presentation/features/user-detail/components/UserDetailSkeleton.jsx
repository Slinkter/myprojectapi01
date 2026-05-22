/**
 * @file UserDetailSkeleton.jsx
 * @description Loading skeleton representing the exact asymmetric Bento Grid layout for high-fidelity loading.
 */

const UserDetailSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 py-8 md:py-12 px-4 animate-pulse">
    <div className="inline-block">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-app-border" />
        <div className="w-20 h-4 rounded bg-app-border" />
      </div>
    </div>

    {/* Header Skeleton Block */}
    <section className="flex flex-col sm:flex-row gap-8 items-center sm:items-start p-8 sm:p-10 border border-app-border/40 rounded-xl bg-app-surface/30">
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl border border-app-border bg-app-border/30 flex-shrink-0" />
      <div className="space-y-4 sm:pt-2 w-full flex-1">
        <div className="h-10 sm:h-12 w-3/4 sm:w-1/2 bg-app-border rounded-lg mx-auto sm:mx-0" />
        <div className="h-6 w-1/4 bg-app-border rounded opacity-70 mx-auto sm:mx-0" />
        <div className="space-y-2 pt-2 w-full">
          <div className="h-4 w-full bg-app-border rounded opacity-50" />
          <div className="h-4 w-5/6 sm:w-3/4 bg-app-border rounded opacity-50" />
        </div>
      </div>
    </section>

    {/* Bento Grid Skeleton matching the new asymmetrical layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      
      {/* Bento 1 Skeleton: Repositories (Double width) */}
      <div className="md:col-span-2 p-8 rounded-xl border border-app-border/40 bg-app-surface/20 flex flex-col justify-between gap-6 min-h-[220px]">
        <div className="flex justify-between items-center">
          <div className="w-12 h-12 rounded-lg bg-app-border" />
          <div className="w-20 h-6 rounded bg-app-border" />
        </div>
        <div className="space-y-3">
          <div className="h-10 w-24 bg-app-border rounded-lg" />
          <div className="h-5 w-40 bg-app-border rounded" />
          <div className="h-3 w-5/6 bg-app-border rounded opacity-50" />
        </div>
        <div className="w-full bg-app-border/20 h-1.5 rounded-none mt-2" />
      </div>

      {/* Bento 2 Skeleton: Followers */}
      <div className="p-8 rounded-xl border border-app-border/40 bg-app-surface/20 flex flex-col justify-between gap-6">
        <div className="w-10 h-10 rounded-lg bg-app-border" />
        <div className="space-y-2">
          <div className="h-8 w-16 bg-app-border rounded" />
          <div className="h-4 w-20 bg-app-border rounded" />
          <div className="h-3 w-full bg-app-border rounded opacity-50" />
        </div>
      </div>

      {/* Bento 3 Skeleton: Following */}
      <div className="p-8 rounded-xl border border-app-border/40 bg-app-surface/20 flex flex-col justify-between gap-6">
        <div className="w-10 h-10 rounded-lg bg-app-border" />
        <div className="space-y-2">
          <div className="h-8 w-16 bg-app-border rounded" />
          <div className="h-4 w-20 bg-app-border rounded" />
          <div className="h-3 w-full bg-app-border rounded opacity-50" />
        </div>
      </div>

      {/* Bento 4 Skeleton: Gists */}
      <div className="p-8 rounded-xl border border-app-border/40 bg-app-surface/20 flex flex-col justify-between gap-6">
        <div className="w-10 h-10 rounded-lg bg-app-border" />
        <div className="space-y-2">
          <div className="h-8 w-16 bg-app-border rounded" />
          <div className="h-4 w-20 bg-app-border rounded" />
          <div className="h-3 w-full bg-app-border rounded opacity-50" />
        </div>
      </div>

      {/* Bento 5 Skeleton: Decortive Tech/Log Card Filler */}
      <div className="p-8 rounded-xl border border-app-border/40 bg-app-surface/20 flex flex-col justify-between min-h-[140px]">
        <div className="w-8 h-8 rounded bg-app-border" />
        <div className="space-y-2">
          <div className="h-4 w-24 bg-app-border rounded" />
          <div className="h-3 w-full bg-app-border rounded opacity-50" />
        </div>
      </div>

    </div>

    {/* Sub-footer Skeleton Pills */}
    <footer className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-8 border-t border-app-border/40">
      <div className="h-9 w-32 bg-app-border rounded-lg opacity-60" />
      <div className="h-9 w-40 bg-app-border rounded-lg opacity-60" />
      <div className="h-9 w-28 bg-app-border rounded-lg opacity-60" />
    </footer>
  </div>
);

export default UserDetailSkeleton;
