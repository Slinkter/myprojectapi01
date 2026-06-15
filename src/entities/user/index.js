/**
 * @file index.js
 * @description Exportador principal de la entidad 'User'.
 * Actúa como una API pública para esta capa de Feature-Sliced Design (FSD).
 */

/**
 * 🎓 CONCEPTO JUNIOR: Barrel Pattern (Patrón Barril)
 * Este archivo se llama "Barrel". Su único trabajo es importar cosas de subcarpetas y volverlas a exportar.
 * 
 * ¿Por qué hacemos esto?
 * Porque así, desde otra parte de la app, podemos escribir:
 * `import { UserCard, useUserQuery } from "@/entities/user";`
 * En lugar de tener que adivinar las rutas internas:
 * `import { UserCard } from "@/entities/user/ui/UserCard";`
 * `import { useUserQuery } from "@/entities/user/api/useUserQuery";`
 * 
 * Además, esto protege el interior: Si renombramos la carpeta 'api' a 'services', 
 * solo cambiamos este archivo y el resto de la app ni se entera.
 */

export { useUserQuery as useUserSearchQuery } from "./api/useUserQuery";
export { useUserDetailQuery } from "./api/useUserDetailQuery";
export { fetchUsersAPI, fetchUserDetailAPI } from "./api/userService";
export { default as ResultFactory } from "./ui/ResultFactory";
export { default as UserCard } from "./ui/UserCard";
export { default as UserDetailSkeleton } from "./ui/UserDetailSkeleton";
export { default as SkeletonCard } from "./ui/SkeletonCard";
export { userAdapter, usersCollectionAdapter } from "./model/adapter";
