import { Suspense, lazy } from "react";
import { SkeletonCard } from "../SkeletonCard";

const UserCard = lazy(() => import("../UserCard"));

const UserList = ({ users }) => (
    <ul className="user-list">
        {users.map((user, index) => (
            <li
                key={user.id}
                className="flex justify-center animate-fade-in-up"
                style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "backwards",
                }}
            >
                <Suspense fallback={<SkeletonCard />}>
                    <UserCard user={user} />
                </Suspense>
            </li>
        ))}
    </ul>
);

export default UserList;
