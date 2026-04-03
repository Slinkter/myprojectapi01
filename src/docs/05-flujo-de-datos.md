# 🔄 Data Lifecycle & State: The Senior Protocol

## 1. Unified Data Strategy

The application manages data through a **Strict Layered Lifecycle**, ensuring that components only consume "Clean Domain Models." This eliminates the risk of API contract changes breaking the UI.

---

## 2. The Seven-Step Data Lifecycle

1.  **Trigger:** User interacts with the UI (e.g., typing in search).
2.  **Debouncing (Stabilization):** `useDebouncedSearch` stabilizes the user intent, preventing redundant network overhead.
3.  **Fetch (Infrastructure):** TanStack Query triggers the `userService` to call the external GitHub API.
4.  **Zod Validation (Integrity Check):** Raw payloads are piped into `GitHubUserSchema.parse()`. If the contract fails, an exception is thrown before reaching the state.
5.  **Adapter Normalization (Domain Mapping):** Validated data is transformed by `userAdapter` into our **Internal Domain Model** (`UserProfile`).
6.  **Sincronización (TanStack Cache):** Normalized data is stored in the query cache with a `staleTime` of 5 minutes.
7.  **Facade Consumption (UI Projection):** `useUserSearchFacade` exposes semantic state (results, isLoading) to the components.

---

## 3. High-Fidelity Logging & Observability

Every transformation is tracked via the centralized `logger.js`:

- **API Entry:** Logs the raw response and status.
- **Validation:** Logs Zod parsing results or validation errors (contract violations).
- **Domain Mapping:** Logs the finalized adapted object ready for the UI.
- **Cache Hits:** Tracks when data is served from memory vs. network.

---

## 4. Resilience Patterns (Senior Protocol)

### Abort Controllers
Every query automatically provides an `AbortSignal`. If the user changes the search term before the previous request finishes, the network request is **aborted**, preventing race conditions and optimizing bandwidth.

### Stale-While-Revalidate (SWR)
The system prioritizes perceived performance by serving stale data from the cache while fetching fresh data in the background, keeping the UI "alive" at all times.

---

## 5. Normalized Cache Structure (Conceptual)

```javascript
queryCache: {
  ["users", "octocat"]: [
    { id: 1, username: "octocat", origin: "github" }, // ADAPTED MODEL
  ],
  ["user", "octocat"]: {
    id: 1,
    name: "The Octocat",
    bio: "I'm the mascot!",
    origin: "github"
  }
}
```
