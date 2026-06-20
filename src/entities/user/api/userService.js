import {
  usersCollectionAdapter,
  userAdapter,
} from "@/entities/user/model/adapter";
import { API_BASE_URL } from "@/shared/config/config";
import { apiFetch } from "@/shared/api/apiFetch";
import { ApiError } from "@/shared/api/ApiError";
import { ZodError } from "zod";

export const fetchUsersAPI = async (searchTerm = "", signal) => {
  const url = searchTerm
    ? `${API_BASE_URL}/search/users?q=${encodeURIComponent(searchTerm)}`
    : `${API_BASE_URL}/users`;

  try {
    const data = await apiFetch(url, { signal });
    const rawUsers = searchTerm ? data.items : data;
    //
    return usersCollectionAdapter(rawUsers);
  } catch (error) {
    console.error("Service: fetchUsersAPI falló su ejecución:", error);

    if (error instanceof ApiError) throw error;

    if (error instanceof ZodError) {
      throw new ApiError(`Error de Validación de Datos: ${error.message}`, 422);
    }

    throw error;
  }
};

export const fetchUserDetailAPI = async (login, signal) => {
  const url = `${API_BASE_URL}/users/${login}`;

  try {
    const rawUser = await apiFetch(url, { signal });

    return userAdapter(rawUser);
  } catch (error) {
    console.error(`Service: fetchUserDetailAPI para "${login}" falló:`, error);

    if (error instanceof ApiError) throw error;
    if (error instanceof ZodError) {
      throw new ApiError(`Error de Validación de Datos: ${error.message}`, 422);
    }

    throw error;
  }
};
