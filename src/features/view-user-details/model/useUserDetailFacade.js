/**
 * @file useUserDetailFacade.js
 * @description Facade hook orchestrating retrieval and state management of detailed GitHub user profile information.
 */

import { useParams } from "react-router-dom";
import { useUserDetailQuery } from "@/entities/user";

/**
 * @typedef {import('@/entities/user/model/schema').UserProfile} UserProfile
 */

/**
 * @typedef {Object} UserDetailFacadeResult
 * @property {string} login - GitHub username from URL parameters.
 * @property {UserProfile|undefined} user - Normalized user details if loaded successfully.
 * @property {boolean} isLoading - True when query is loading for the first time.
 * @property {boolean} isError - True when fetch encountered a connection or API error.
 * @property {Error|null} error - Error object with details on failure.
 * @property {boolean} isSuccess - True when data was successfully fetched.
 */

/**
 * Custom facade hook to separate user detail logic and routing from presentation.
 *
 * @hook
 * @function useUserDetailFacade
 * @returns {UserDetailFacadeResult} Orchestrated states and data.
 */
export const useUserDetailFacade = () => {
  const { login } = useParams();

  const {
    data: user,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useUserDetailQuery(login);

  return {
    login,
    user,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
