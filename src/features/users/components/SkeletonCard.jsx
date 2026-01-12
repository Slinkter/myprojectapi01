/**
 * @file Skeleton Card Component
 * @description
 * Loading placeholder component that mimics the structure of UserCard.
 * Provides visual feedback during data fetching.
 */

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";

/**
 * Skeleton Card Component
 *
 * @component
 * @description
 * Animated loading placeholder that matches the UserCard layout.
 * Uses pulse animation to indicate loading state.
 *
 * Features:
 * - Matches UserCard dimensions and structure
 * - Pulse animation for loading indication
 * - Dark mode support
 * - Placeholder blocks for avatar, username, and buttons
 *
 * Structure:
 * - Header: Avatar placeholder (48px height)
 * - Body: Username placeholder (centered, 75% width)
 * - Footer: Button placeholder (full width)
 *
 * @returns {JSX.Element} Animated skeleton card
 *
 * @example
 * // Used in SkeletonGrid during loading
 * <SkeletonCard />
 */
const SkeletonCard = () => (
  <Card className="w-full max-w-xs shadow-lg rounded-xl animate-pulse bg-white dark:bg-dark-surface">
    <CardHeader
      shadow={false}
      floated={false}
      className="relative grid h-48 mx-auto place-items-center bg-gray-300 dark:bg-gray-700"
    >
      &nbsp;
    </CardHeader>
    <CardBody className="text-center">
      <div className="h-6 w-3/4 mx-auto rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </CardBody>
    <CardFooter className="pt-0">
      <div className="h-12 w-full rounded-lg bg-gray-300 dark:bg-gray-700"></div>
    </CardFooter>
  </Card>
);

export default SkeletonCard;
