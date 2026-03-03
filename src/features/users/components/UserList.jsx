/**
 * @file User List Component
 * @description Container component with responsive grid of user cards
 */

import UserCard from "./UserCard";
import PropTypes from "prop-types";

const UserList = ({ users }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 w-full max-w-screen-2xl mx-auto p-4">
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
