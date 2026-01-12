/**
 * @file Users Feature - Barrel Export
 * @description
 * Central export point for the users feature module.
 * Follows Feature-Based Architecture principles where each feature is self-contained
 * with its own components, hooks, and state management.
 *
 * Exports:
 * - Main component: UserSearch
 * - UI Components: UserCard, UserList, SkeletonCard, SkeletonGrid
 * - Custom Hooks: useUserFetching
 * - Redux: usersReducer, fetchUsers thunk
 *
 * @module features/users
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
