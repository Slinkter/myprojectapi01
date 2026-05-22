/**
 * @file User Detail Skeleton Component (Minimalist Refactor)
 */

const UserDetailSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 py-8 md:py-12 px-4 animate-pulse">
    <div className="inline-block">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-app-border" />
        <div className="w-16 h-4 rounded bg-app-border" />
      </div>
    </div>

    <section className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start">
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-app-border bg-app-surface flex-shrink-0" />
      <div className="space-y-3 sm:pt-2 w-full flex-1">
        <div className="h-8 sm:h-10 w-3/4 sm:w-1/2 bg-app-border rounded-md mx-auto sm:mx-0" />
        <div className="h-6 w-1/3 bg-app-border rounded-md opacity-70 mx-auto sm:mx-0" />
        <div className="space-y-2 pt-2 w-full">
          <div className="h-4 w-full bg-app-border rounded-md opacity-50" />
          <div className="h-4 w-5/6 sm:w-3/4 bg-app-border rounded-md opacity-50" />
        </div>
      </div>
    </section>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="border border-app-border p-5 sm:p-6 rounded-xl bg-app-surface flex flex-col items-center sm:items-start"
        >
          <div className="h-8 w-1/2 bg-app-border rounded-md mb-3" />
          <div className="h-3 w-3/4 bg-app-border rounded-md opacity-50" />
        </div>
      ))}
    </div>

    <footer className="flex flex-col sm:flex-row flex-wrap items-center sm:items-start justify-center sm:justify-start gap-x-10 gap-y-4 pt-8 border-t border-app-border">
      <div className="h-4 w-24 bg-app-border rounded-md opacity-50" />
      <div className="h-4 w-32 bg-app-border rounded-md opacity-50" />
      <div className="h-4 w-28 bg-app-border rounded-md opacity-50" />
    </footer>
  </div>
);

export default UserDetailSkeleton;
