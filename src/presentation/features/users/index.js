/**
 * @file Users Feature - Barrel Export
 * @description
 * Central export point for the users feature module.
 * 
 * This module is powered by TanStack Query for server state management.
 */

// Main feature component
export { default as UserSearch } from "@/presentation/features/users/UserSearch";

// Components
export { default as UserCard } from "@/presentation/features/users/components/UserCard";
export { default as UserList } from "@/presentation/features/users/components/UserList";
export { default as SkeletonCard } from "@/presentation/features/users/components/SkeletonCard";
export { default as SkeletonGrid } from "@/presentation/features/users/components/SkeletonGrid";

// Hooks (Now located in Application Layer)
export { useUserSearchFacade } from "@/application/facades/useUserSearchFacade";
export { useUserQuery } from "@/application/queries/useUserQuery";
