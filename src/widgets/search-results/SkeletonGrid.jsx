import SkeletonCard from "@/entities/user/ui/SkeletonCard";
import { cn, SWISS_STYLE_TOKENS } from "@/shared";

const SkeletonGrid = () => (
  <div className={cn(SWISS_STYLE_TOKENS.stack, "py-12")}>
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  </div>
);

export default SkeletonGrid;
