/**
 * @file User List Component
 * @description Container component with responsive grid of user cards
 */

import UserCard from "./UserCard";
import PropTypes from "prop-types";

const UserList = ({ users }) => {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-screen-2xl">
      {users.map((user) => (
        <li key={user.id} className="flex justify-center">
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
