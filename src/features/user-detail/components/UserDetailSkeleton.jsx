/**
 * @file User Detail Skeleton Component (Minimalist Refactor)
 */

const UserDetailSkeleton = () => (
  <div className="max-w-3xl mx-auto space-y-12 py-4 animate-pulse">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded bg-app-border" />
      <div className="w-16 h-4 rounded bg-app-border" />
    </div>

    <section className="flex flex-col md:flex-row gap-8 items-start md:items-center">
      <div className="w-32 h-32 rounded-full border border-app-border bg-app-surface flex-shrink-0" />
      <div className="space-y-4 w-full max-w-xl">
        <div className="h-8 w-3/4 bg-app-border rounded-md" />
        <div className="h-6 w-1/3 bg-app-border rounded-md opacity-70" />
        <div className="space-y-2 pt-2">
          <div className="h-4 w-full bg-app-border rounded-md opacity-50" />
          <div className="h-4 w-5/6 bg-app-border rounded-md opacity-50" />
        </div>
      </div>
    </section>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="border border-app-border p-4 rounded-lg bg-app-surface"
        >
          <div className="h-8 w-1/2 bg-app-border rounded-md mb-2" />
          <div className="h-3 w-3/4 bg-app-border rounded-md opacity-50" />
        </div>
      ))}
    </div>

    <footer className="flex flex-wrap gap-x-10 gap-y-4 pt-6 border-t border-app-border">
      <div className="h-4 w-24 bg-app-border rounded-md opacity-50" />
      <div className="h-4 w-32 bg-app-border rounded-md opacity-50" />
      <div className="h-4 w-28 bg-app-border rounded-md opacity-50" />
    </footer>
  </div>
);

export default UserDetailSkeleton;
