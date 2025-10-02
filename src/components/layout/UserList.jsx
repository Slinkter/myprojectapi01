import { Suspense, lazy } from "react";
import { SkeletonCard } from "../SkeletonCard";

const UserCard = lazy(() => import("../UserCard"));
/* <SkeletonCard /> */

const UserList = ({ users }) => (
    <ul className="user-list">
        {users.map((user, index) => (
            <li
                key={index}
                className="flex justify-center animate-fade-in-up"
                style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "backwards",
                }}
            >
                <Suspense fallback={null}>
                    <UserCard user={user} />
                </Suspense>
            </li>
        ))}
    </ul>
);

export default UserList;
