import UserCard from "./UserCard";
import PropTypes from "prop-types";

const UserList = ({ users }) => {
  console.log("UserList - users prop:", users);
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 w-full max-w-screen-2xl p-4">
      {users.map((user, index) => (
        <li
          key={user.id}
          className="animate-skeleton-loading flex justify-center"
          style={{
            animationDelay: `${index * 150}ms`,
            animationFillMode: "backwards",
          }}
        >
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
