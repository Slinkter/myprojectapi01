/**
 * @file Users Feature - Barrel Export
 * @description
 * Central export point for the users feature module.
 * Follows Feature-Based Architecture (FSD) principles.
 * 
 * This module is now 100% powered by TanStack Query for server state management.
 */

// Main feature component
export { default as UserSearch } from "./UserSearch";

// Components
export { default as UserCard } from "./components/UserCard";
export { default as UserList } from "./components/UserList";
export { default as SkeletonCard } from "./components/SkeletonCard";
export { default as SkeletonGrid } from "./components/SkeletonGrid";

// Hooks
export { useUserSearchFacade } from "./hooks/useUserSearchFacade";
export { useUserQuery } from "./hooks/useUserQuery";
