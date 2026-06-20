import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useUserDetailQuery } from "@/entities/user";







export const useUserDetailFacade = () => {

  

  const { login } = useParams();

  

  const {
    data: user,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useUserDetailQuery(login);

  

  const prevState = useRef("");
  const currentState = isLoading
    ? "loading"
    : isError
      ? "error"
      : isSuccess
        ? "success"
        : "idle";
  useEffect(() => {
    if (prevState.current !== currentState && currentState !== "idle") {
      console.log(
        `%c    📡 TanStack Query: ${currentState}${currentState === "success" && user ? ` (${user.username})` : ""}`,
        "color: #a855f7; font-weight: 500;",
      );
      prevState.current = currentState;
    }
  }, [currentState, user]);

  

  return {
    login,
    user,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
