import { SkeletonCard } from "../SkeletonCard";

const SKELETON_COUNT = 10;

const SkeletonGrid = () => (
    <ul className="user-list">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <li
                key={index}
                className="flex justify-center animate-fade-in-up"
                style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "backwards",
                }}
            >
                <SkeletonCard />
            </li>
        ))}
    </ul>
);

export default SkeletonGrid;
