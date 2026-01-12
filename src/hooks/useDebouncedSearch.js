/**
 * @file Debounced Search Hook
 * @description
 * Custom hook for debouncing input values to optimize expensive operations
 * like API calls. Delays value updates until user stops typing.
 */

import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing search input values
 *
 * @hook
 * @function useDebouncedSearch
 * @param {*} initialValue - Initial value for both input and debounced value
 * @param {number} delay - Delay in milliseconds before updating debounced value
 * @returns {[*, Function, *]} Tuple containing input value, setter, and debounced value
 * @returns {*} returns[0] - Current input value (updates immediately)
 * @returns {Function} returns[1] - Setter function to update input value
 * @returns {*} returns[2] - Debounced value (updates after delay)
 *
 * @description
 * Provides two synchronized values:
 * - inputValue: Updates immediately as user types (for controlled inputs)
 * - debouncedValue: Updates only after user stops typing for specified delay
 *
 * This pattern is useful for:
 * - Search inputs with API calls
 * - Form validation
 * - Auto-save functionality
 * - Any operation that shouldn't run on every keystroke
 *
 * The hook automatically cleans up pending timers when:
 * - Component unmounts
 * - Input value changes before delay completes
 * - Delay value changes
 *
 * @example
 * function SearchComponent() {
 *   const [inputValue, setInputValue, debouncedValue] = useDebouncedSearch('', 500);
 *
 *   // Fetch data when debounced value changes
 *   useEffect(() => {
 *     if (debouncedValue) {
 *       fetchSearchResults(debouncedValue);
 *     }
 *   }, [debouncedValue]);
 *
 *   return (
 *     <input
 *       value={inputValue}
 *       onChange={(e) => setInputValue(e.target.value)}
 *     />
 *   );
 * }
 */
export const useDebouncedSearch = (initialValue, delay) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    // 1. Set up timer to update debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    // 2. Clean up timer if input value changes
    // This prevents debounced value from updating while user is still typing
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]); // Re-run only if input value or delay changes

  return [inputValue, setInputValue, debouncedValue];
};
