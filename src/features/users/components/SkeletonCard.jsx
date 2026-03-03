/**
 * @file Skeleton Card Component
 * @description Standardized Skeleton Card exact match for UserCard.
 */

const SkeletonCard = () => (
  <div className="h-full w-full max-w-[300px] sm:max-w-none mx-auto">
    <div className="flex flex-col h-full w-full rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-dark-surface animate-pulse">
      {/* Card Body Placeholder */}
      <div className="p-6 md:p-8 flex flex-col items-center flex-grow">
        {/* Avatar Placeholder */}
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-dark-surface shadow-md" />

        {/* Title Placeholder */}
        <div className="mt-5 w-3/4 h-7 rounded-md bg-gray-200 dark:bg-gray-700 mx-auto" />

        {/* Subtitle Placeholder */}
        <div className="mt-2 w-1/2 h-5 rounded-md bg-gray-200 dark:bg-gray-700 mx-auto" />
      </div>

      {/* Card Footer Placeholder */}
      <div className="p-6 md:p-8 pt-0 mt-auto w-full">
        <div className="w-full h-[54px] rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
