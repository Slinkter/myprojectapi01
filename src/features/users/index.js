/**
 * @file Users Feature - Barrel Export
 * @description
 * Central export point for the users feature module.
 * Follows Feature-Based Architecture (FSD) principles.
 * 
 * This module is now 100% powered by TanStack Query for server state management.
 */

// Main feature component
export { default as UserSearch } from "@/features/users/UserSearch";

// Components
export { default as UserCard } from "@/features/users/components/UserCard";
export { default as UserList } from "@/features/users/components/UserList";
export { default as SkeletonCard } from "@/features/users/components/SkeletonCard";
export { default as SkeletonGrid } from "@/features/users/components/SkeletonGrid";

// Hooks
export { useUserSearchFacade } from "@/features/users/hooks/useUserSearchFacade";
export { useUserQuery } from "@/features/users/hooks/useUserQuery";
