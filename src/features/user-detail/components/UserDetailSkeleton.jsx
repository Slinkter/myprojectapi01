/**
 * @file User Detail Skeleton Component
 * @description High-fidelity shimmer skeleton for the user detail view.
 */

const UserDetailSkeleton = () => {
  return (
    <div className="w-full max-w-4xl px-4 mx-auto animate-pulse">
      {/* Back Button Skeleton */}
      <div className="h-6 w-32 bg-light-border dark:bg-dark-border rounded-lg mb-8" />

      <div className="w-full bg-light-surface dark:bg-dark-surface shadow-premium dark:shadow-dark-premium rounded-3xl overflow-hidden border border-light-border dark:border-dark-border">
        {/* Banner Skeleton */}
        <div className="h-48 sm:h-64 bg-light-border dark:bg-dark-border relative" />

        {/* Profile Content Skeleton */}
        <div className="relative px-6 sm:px-12 pb-10">
          {/* Avatar Skeleton */}
          <div className="absolute -top-16 sm:-top-24 left-6 sm:left-12">
            <div className="h-32 w-32 sm:h-48 sm:w-48 rounded-full border-8 border-light-surface dark:border-dark-surface bg-light-border dark:bg-dark-border" />
          </div>

          {/* User Meta Skeleton */}
          <div className="pt-20 sm:pt-28 space-y-4">
            <div className="h-10 w-2/3 bg-light-border dark:bg-dark-border rounded-xl" />
            <div className="h-6 w-1/3 bg-light-border dark:bg-dark-border rounded-lg opacity-50" />
            <div className="h-20 w-full bg-light-border dark:bg-dark-border rounded-xl mt-4" />
          </div>

          <div className="h-px bg-light-border dark:bg-dark-border my-8" />

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-neutral-50 dark:bg-neutral-900/50 p-5 rounded-2xl border border-light-border dark:border-dark-border h-32"
              />
            ))}
          </div>

          {/* Footer Metadata Skeleton */}
          <div className="flex flex-wrap gap-8">
            <div className="h-6 w-32 bg-light-border dark:bg-dark-border rounded-lg" />
            <div className="h-6 w-32 bg-light-border dark:bg-dark-border rounded-lg" />
            <div className="h-6 w-32 bg-light-border dark:bg-dark-border rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailSkeleton;
