


const UserDetailSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 py-8 md:py-12 px-4 animate-pulse">
    {}
    <div className="inline-block">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-border" />
        <div className="w-20 h-4 rounded bg-border" />
      </div>
    </div>

    {}
    <section className="flex flex-col sm:flex-row gap-8 items-center sm:items-start p-8 border border-border bg-surface rounded-2xl">
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-border bg-border/30 flex-shrink-0" />
      <div className="space-y-4 sm:pt-2 w-full flex-1">
        <div className="h-10 sm:h-12 w-3/4 sm:w-1/2 bg-border rounded-xl mx-auto sm:mx-0" />
        <div className="h-6 w-1/4 bg-border rounded opacity-70 mx-auto sm:mx-0" />
        <div className="space-y-2 pt-2 w-full">
          <div className="h-4 w-full bg-border rounded opacity-50" />
          <div className="h-4 w-5/6 sm:w-3/4 bg-border rounded opacity-50" />
        </div>
      </div>
    </section>

    {}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      
      {}
      <div className="md:col-span-2 p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between gap-6 min-h-[220px]">
        <div className="flex justify-between items-center">
          <div className="w-12 h-12 rounded-lg bg-border" />
          <div className="w-20 h-6 rounded bg-border" />
        </div>
        <div className="space-y-3">
          <div className="h-10 w-24 bg-border rounded-lg" />
          <div className="h-5 w-40 bg-border rounded" />
          <div className="h-3 w-5/6 bg-border rounded opacity-50" />
        </div>
        <div className="w-full bg-border/20 h-1.5 rounded-none mt-2" />
      </div>

      {}
      <div className="p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between gap-6">
        <div className="w-10 h-10 rounded-lg bg-border" />
        <div className="space-y-2">
          <div className="h-8 w-16 bg-border rounded" />
          <div className="h-4 w-20 bg-border rounded" />
          <div className="h-3 w-full bg-border rounded opacity-50" />
        </div>
      </div>

      {}
      <div className="p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between gap-6">
        <div className="w-10 h-10 rounded-lg bg-border" />
        <div className="space-y-2">
          <div className="h-8 w-16 bg-border rounded" />
          <div className="h-4 w-20 bg-border rounded" />
          <div className="h-3 w-full bg-border rounded opacity-50" />
        </div>
      </div>

      {}
      <div className="p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between gap-6">
        <div className="w-10 h-10 rounded-lg bg-border" />
        <div className="space-y-2">
          <div className="h-8 w-16 bg-border rounded" />
          <div className="h-4 w-20 bg-border rounded" />
          <div className="h-3 w-full bg-border rounded opacity-50" />
        </div>
      </div>

      {}
      <div className="p-6 rounded-2xl border border-border bg-surface flex flex-col justify-between min-h-[160px]">
        <div className="flex items-center gap-1.5 border-b border-border pb-2.5 w-full">
          <div className="w-2 h-2 rounded-full bg-border/40" />
          <div className="w-2 h-2 rounded-full bg-border/40" />
          <div className="w-2 h-2 rounded-full bg-border/40" />
        </div>
        <div className="space-y-2 py-1 flex-1 flex flex-col justify-center">
          <div className="h-3 w-20 bg-border rounded opacity-30" />
          <div className="h-3 w-32 bg-border rounded opacity-50" />
          <div className="h-3 w-40 bg-border rounded opacity-50" />
        </div>
      </div>

    </div>

    {}
    <footer className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-8 border-t border-border">
      <div className="h-9 w-32 bg-border rounded-xl opacity-60" />
      <div className="h-9 w-40 bg-border rounded-xl opacity-60" />
      <div className="h-9 w-28 bg-border rounded-xl opacity-60" />
    </footer>
  </div>
);

UserDetailSkeleton.displayName = "UserDetailSkeleton";

export default UserDetailSkeleton;
