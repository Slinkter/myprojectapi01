import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging Tailwind classes with CLSX
 * Resolves conflicts and handles conditional classes cleanly.
 * 
 * @param {...string} inputs - Class names or conditional objects
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
