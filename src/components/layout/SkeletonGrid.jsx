import { SkeletonCard } from "../SkeletonCard";

const SKELETON_COUNT = 30;

const SkeletonGrid = () => (
    <ul className="user-grid">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <li
                key={index}
                className="user-grid__item"
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
