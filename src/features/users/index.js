/**
 * Users Feature - Index
 *
 * This file exports all public components and hooks from the users feature.
 * Following Feature-Based Architecture principles, this feature is self-contained.
 */

// Main feature component
export { default as UserSearch } from "./UserSearch";

// Components
export { default as UserCard } from "./components/UserCard";
export { default as UserList } from "./components/UserList";
export { default as SkeletonCard } from "./components/SkeletonCard";
export { default as SkeletonGrid } from "./components/SkeletonGrid";

// Hooks
export { useUserFetching } from "./hooks/useUserFetching";

// Redux slice
export { default as usersReducer, fetchUsers } from "./usersSlice";
