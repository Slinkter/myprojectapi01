/**
 * @file Application Configuration
 * @description
 * Centralized configuration for the application.
 */

export const API_BASE_URL = import.meta.env.VITE_GITHUB_API_URL || "https://api.github.com";

export const DEBOUNCE_DELAY = 500;
export const STALE_TIME = 1000 * 60 * 5; // 5 minutes
export const GC_TIME = 1000 * 60 * 10; // 10 minutes
