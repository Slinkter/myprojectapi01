/**
 * @file config.js
 * @description Global configuration constants for caching, debouncing, and API URLs.
 */

export const STALE_TIME = 5 * 60 * 1000; // 5 minutes
export const GC_TIME = 10 * 60 * 1000; // 10 minutes
export const DEBOUNCE_DELAY = 500; // 500ms
export const API_BASE_URL = "https://api.github.com";
