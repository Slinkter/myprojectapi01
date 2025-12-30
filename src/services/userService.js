const API_BASE_URL = "https://api.github.com";

/**
 * Fetches users from the GitHub API.
 * It can either search for users based on a search term or fetch a default list of users.
 *
 * @param {string} [searchTerm=""] - The term to search for. If empty, fetches all users.
 * @returns {Promise<Array>} A promise that resolves to the array of users.
 * @throws {Error} Throws an error if the network response is not ok.
 */
export const fetchUsersAPI = async (searchTerm = "") => {
    try {
        const url = searchTerm
            ? `${API_BASE_URL}/search/users?q=${searchTerm}`
            : `${API_BASE_URL}/users`;

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = {
                status: response.status,
                statusText: response.statusText,
                message: `HTTP error! status: ${response.status} - ${response.statusText}`,
            };
            throw new Error(JSON.stringify(errorData));
        }

        const data = await response.json();

        // The GitHub search API returns users in an `items` property.
        return searchTerm ? data.items : data;
    } catch (error) {
        console.error("Failed to fetch users from GitHub API:", error);
        // Re-throw for the thunk to catch.
        throw error;
    }
};
