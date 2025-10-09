import { Suspense, lazy } from "react";
import PropTypes from "prop-types";

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
                <Suspense fallback={null}>
                    <UserCard user={user} />
                </Suspense>
            </li>
        ))}
    </ul>
);

UserList.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UserList;
