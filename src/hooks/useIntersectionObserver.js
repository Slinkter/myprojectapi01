/**
 * @file Intersection Observer Hook
 * @description
 * Custom hook that detects when an element becomes visible in the viewport.
 * Uses the Intersection Observer API for efficient visibility detection.
 */

import { useState, useEffect } from "react";

/**
 * Custom hook for detecting element visibility in viewport
 *
 * @hook
 * @function useIntersectionObserver
 * @param {React.RefObject} elementRef - Reference to the DOM element to observe
 * @param {Object} [options={}] - Intersection Observer configuration options
 * @param {number} [options.threshold=0.1] - Percentage of element visibility (0-1) required to trigger
 * @param {Element} [options.root] - Element used as viewport for checking visibility (defaults to browser viewport)
 * @param {string} [options.rootMargin] - Margin around root element (CSS margin syntax)
 * @returns {boolean} True if element is intersecting (visible), false otherwise
 *
 * @description
 * Wraps the Intersection Observer API to provide a simple boolean state
 * indicating whether the observed element is visible in the viewport.
 *
 * Common use cases:
 * - Infinite scroll / lazy loading
 * - Triggering animations on scroll
 * - Analytics tracking (viewport visibility)
 * - Performance optimization (render only visible content)
 *
 * The hook automatically:
 * - Creates and configures the observer
 * - Observes the target element
 * - Cleans up observer on unmount
 * - Re-observes if ref or options change
 *
 * @example
 * function InfiniteScroll() {
 *   const sentinelRef = useRef(null);
 *   const isVisible = useIntersectionObserver(sentinelRef, { threshold: 0.1 });
 *
 *   useEffect(() => {
 *     if (isVisible) {
 *       loadMoreItems();
 *     }
 *   }, [isVisible]);
 *
 *   return (
 *     <div>
 *       {items.map(item => <Item key={item.id} {...item} />)}
 *       <div ref={sentinelRef}>Loading...</div>
 *     </div>
 *   );
 * }
 */
const useIntersectionObserver = (elementRef, { threshold = 0.1 } = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const card = elementRef.current;
    if (!card) return;

    // Create IntersectionObserver instance
    // This browser API asynchronously observes changes in the intersection
    // of a target element with an ancestor element or the viewport
    const observer = new IntersectionObserver(
      // Callback function executed when visibility changes
      ([entry]) => {
        // The callback receives a list of IntersectionObserverEntry objects,
        // but we only care about the first (and only) one
        // entry.isIntersecting is true when element is visible in viewport
        setIsIntersecting(entry.isIntersecting);
      },
      // Configuration object
      {
        // threshold defines what percentage of element visibility
        // must be reached to trigger the callback
        // e.g., threshold of 0.1 means callback fires when 10% is visible
        threshold,
      }
    );

    observer.observe(card);

    // Clean up observer when component unmounts
    return () => {
      observer.unobserve(card);
    };
  }, [elementRef, threshold]);

  return isIntersecting;
};

export default useIntersectionObserver;
