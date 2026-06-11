import { useState, useEffect } from "react";

/**
 * Hook to debounce state values, particularly text inputs for searching.
 *
 * @param {string} initialValue - The initial value
 * @param {number} delay - Debounce delay in milliseconds
 * @returns {[string, Function, string]} Tuple containing current value, setter function, and debounced value
 */
export const useDebouncedSearch = (initialValue = "", delay = 500) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  return [searchTerm, setSearchTerm, debouncedSearchTerm];
};
