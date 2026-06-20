import { useQuery } from "@tanstack/react-query";
import { fetchUsersAPI } from "@/entities/user/api/userService";
import { STALE_TIME, GC_TIME } from "@/shared/config/config";

export const useUserQuery = (searchTerm) => {
  return useQuery({
    queryKey: ["users", searchTerm],
    queryFn: async () => {
      return fetchUsersAPI(searchTerm);
    },
    enabled: searchTerm.trim().length === 0 || searchTerm.trim().length >= 3,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
};

/* 

Es un hook que envuelve useQuery de TanStack Query. Funciona así:
useUserQuery("mojombo")
Paso a paso:
1. queryKey: ["users", "mojombo"] — Identificador único del caché. Si otro componente pide los mismos datos con la misma key, TanStack no hace otra llamada, devuelve la caché.
2. queryFn — Función que ejecuta el fetch real. Llama a fetchUsersAPI("mojombo") que hace la petición HTTP a GitHub.
3. enabled — Controla cuándo se dispara la query:
- "" (vacío) → se ejecuta (es el primer render, carga inicial)
- "mo" (menos de 3 chars) → NO se ejecuta
- "mojombo" (3+) → se ejecuta
4. staleTime — Tiempo que los datos se consideran "frescos". Si vuelves a pedir "mojombo" dentro de ese tiempo, TanStack responde con caché sin hacer fetch.
5. gcTime (antes cacheTime) — Tiempo que los datos permanecen en memoria después de que ningún componente los usa.
Lo que devuelve:
const { data, isLoading, isError, error, status, refetch } = useUserQuery("mojombo");
Propiedad	Significado
data	Los usuarios ya validados por el adapter
isLoading	true mientras esperas la respuesta
isError	true si la API falló
status	"pending" | "success" | "error"
refetch	Función para forzar un nuevo fetch





*/
