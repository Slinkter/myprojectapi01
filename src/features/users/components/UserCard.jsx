/**
 * @file User Card Component
 * @description
 * Presentational component that renders a single user's information in a card format.
 * Implements performance optimizations including memoization, lazy loading, and
 * intersection observer for scroll animations.
 *
 * Performance Optimizations:
 * - React.memo: Prevents re-renders when props haven't changed
 * - useIntersectionObserver: Triggers animation only when card enters viewport
 * - loading="lazy": Defers image loading until needed
 *
 * Features:
 * - Material Tailwind card design
 * - Smooth scale-in animation on scroll
 * - Dark mode support
 * - Lazy-loaded avatar images
 * - Links to user detail page and GitHub profile
 */

import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  CardHeader,
} from "@material-tailwind/react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

/**
 * User Card Component
 *
 * @component
 * @description
 * Displays a user's information in a card format with avatar, username,
 * and action buttons. Optimized for performance in long lists.
 *
 * Performance Features:
 * - Memoized with React.memo to prevent unnecessary re-renders
 * - Intersection Observer for viewport-based animations
 * - Lazy image loading for bandwidth optimization
 * - Smooth hover effects and transitions
 *
 * Visual Features:
 * - Scale-in animation when entering viewport
 * - Hover shadow effect
 * - Responsive design
 * - Dark mode support
 * - Circular avatar with shadow
 *
 * @param {Object} props - Component props
 * @param {Object} props.user - User object from GitHub API
 * @param {string} props.user.avatar_url - URL of user's avatar image
 * @param {string} props.user.login - GitHub username
 * @param {string} props.user.html_url - URL to user's GitHub profile
 *
 * @returns {JSX.Element} User card with avatar and action buttons
 *
 * @example
 * <UserCard
 *   user={{
 *     avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
 *     login: "octocat",
 *     html_url: "https://github.com/octocat"
 *   }}
 * />
 */
const UserCard = React.memo(({ user = {} }) => {
  const { avatar_url, login, html_url } = user;

  // Ref for the card element, used by Intersection Observer
  const cardRef = useRef(null);

  /**
   * Intersection observer hook
   *
   * @description
   * Returns true when the referenced element is visible on screen.
   *
   * threshold: 0.1 means the callback fires when 10% of the card
   * appears in the viewport (visible area of the browser).
   *
   * This triggers the scale-in animation at the right moment.
   */
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });

  /**
   * Conditional CSS classes for entry animation
   *
   * @description
   * Uses a combination of opacity and scale for the initial state,
   * allowing the IntersectionObserver to detect the element.
   *
   * - Before visible: opacity-0 scale-90 (invisible, slightly smaller)
   * - After visible: opacity-100 scale-100 + animation (visible, full size)
   */
  const animationClass = isVisible
    ? "animate-scale-in opacity-100 scale-100"
    : "opacity-0 scale-90";

  return (
    <Card
      ref={cardRef}
      className={`w-full max-w-xs overflow-hidden transition-all duration-100 hover:shadow-2xl rounded-xl bg-white dark:bg-gray-800 ${animationClass}`}
      shadow={true}
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-auto mt-6 flex h-40 w-40 justify-center items-center bg-transparent self-center"
      >
        <img
          src={avatar_url}
          alt={`Avatar de ${login}`}
          loading="lazy"
          className="h-full w-full rounded-full object-cover object-center shadow-md"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography
          variant="h4"
          className="mb-2 text-xl text-green-700 dark:text-green-300"
        >
          {login}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex flex-col gap-2">
        <Link to={`/user/${login}`}>
          <Button
            color="green"
            size="lg"
            className="transition-transform hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            fullWidth={true}
          >
            Ver Detalles
          </Button>
        </Link>
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver el perfil de ${login} en Github`}
        >
          <Button
            color="amber"
            variant="outlined"
            size="lg"
            className="transition-transform hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            fullWidth={true}
          >
            GitHub Profile
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
});

// Display name for React DevTools
UserCard.displayName = "UserCard";

/**
 * PropTypes validation
 *
 * @description
 * Ensures the component receives the correct prop types.
 * The user object must contain avatar_url, login, and html_url strings.
 */
UserCard.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    login: PropTypes.string,
    html_url: PropTypes.string,
  }).isRequired,
};

export default UserCard;
