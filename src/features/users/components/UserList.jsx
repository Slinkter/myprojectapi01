/**
 * @file User List Component
 * @description
 * Container component that renders a responsive grid of user cards.
 * Implements staggered animations for visual appeal.
 */

import UserCard from "./UserCard";
import PropTypes from "prop-types";

/**
 * User List Component
 *
 * @component
 * @description
 * Renders a responsive grid layout of user cards with staggered animations.
 * Each card appears with a progressive delay for smooth visual effect.
 *
 * Features:
 * - Responsive grid (1-4 columns based on screen size)
 * - Staggered fade-in animations (150ms delay between cards)
 * - Centered card alignment
 * - Maximum width constraint for large screens
 *
 * Grid Breakpoints:
 * - Mobile: 1 column
 * - Small: 2 columns
 * - Medium: 3 columns
 * - Large/XL: 4 columns
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.users - Array of user objects from GitHub API
 * @param {number} props.users[].id - Unique user ID (used as key)
 * @param {string} props.users[].login - GitHub username
 * @param {string} props.users[].avatar_url - User avatar URL
 * @param {string} props.users[].html_url - GitHub profile URL
 *
 * @returns {JSX.Element} Grid of user cards
 *
 * @example
 * <UserList
 *   users={[
 *     { id: 1, login: 'octocat', avatar_url: '...', html_url: '...' },
 *     { id: 2, login: 'torvalds', avatar_url: '...', html_url: '...' }
 *   ]}
 * />
 */
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

/**
 * PropTypes validation
 */
UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
