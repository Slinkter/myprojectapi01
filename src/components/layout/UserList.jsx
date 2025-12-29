import { Suspense, lazy } from "react";
import PropTypes from "prop-types";

import SkeletonCard from "../SkeletonCard"; // Importar SkeletonCard como default
const UserCard = lazy(() => import("../UserCard"));

const UserList = ({ users }) => {
    console.log("UserList - users prop:", users);
    return (
        <ul className="user-grid">
            {users.map((user, index) => (
                <li
                    key={user.id}
                    className="user-grid__item"
                    style={{
                        animationDelay: `${index * 150}ms`,
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
};

UserList.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UserList;
