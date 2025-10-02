import {
    useState,
    useMemo,
    lazy,
    Suspense,
    useTransition,
    useEffect,
} from "react";
import {
    Typography,
    Button,
    Input,
    IconButton,
    Spinner,
} from "@material-tailwind/react";
import useFetch from "./hooks/useFetch.js";
import { useTheme } from "./hooks/useTheme.js";

// El Skeleton se importa de forma síncrona para que esté disponible inmediatamente como fallback.
import SkeletonCard from "./components/SkeletonCard";
const UserCard = lazy(() => import("./components/UserCard"));

// URL de la API de GitHub para obtener usuarios
const API_URL = "https://api.github.com/users";

const App = () => {
    const [theme, toggleTheme] = useTheme(); // Hook para gestionar el tema (claro/oscuro)
    const [searchTerm, setSearchTerm] = useState("");
    const { data: users, isLoading, error, refetch } = useFetch(API_URL); // Utiliza el custom hook `useFetch`
    // 1. useTransition para que la UI no se bloquee al filtrar.
    const [isPending, startTransition] = useTransition();

    // 2. Preload del componente:
    // Disparamos la descarga del código de UserCard en paralelo a la petición de datos.
    // Así, cuando los datos lleguen, el componente ya estará listo para renderizarse.
    useEffect(() => {
        // Esta importación dinámica solo pide el archivo, no lo ejecuta.
        import("./components/UserCard");
    }, []);

    // Filtra los usuarios basándose en el término de búsqueda.
    // `useMemo` es crucial aquí para optimizar el rendimiento,
    // ya que evita recalcular la lista en cada render, solo cuando `users` o `searchTerm` cambian.
    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter((user) =>
            user.login.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // Renderizado condicional: Muestra un mensaje de error con un botón para reintentar.
    if (error) {
        return (
            <div className="min-h-dvh flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
                <Typography variant="h3" color="red">
                    Error
                </Typography>
                <Typography variant="h3" color="red">
                    {error.message}
                </Typography>
                <Button color="blue" onClick={refetch} className="mt-4 ">
                    Reintentar
                </Button>
            </div>
        );
    }

    // Renderiza la interfaz principal con la lista de usuarios una vez que los datos han sido cargados exitosamente.
    return (
        <main className="min-h-dvh flex flex-col items-center p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <header className="w-full max-w-screen-2xl my-8">
                <div className="flex justify-end mb-4">
                    <IconButton
                        variant="text"
                        className="rounded-full border border-black dark:bg-gray-100"
                        onChange={toggleTheme}
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                    </IconButton>
                </div>
                <Typography variant="h1" className="mb-2 text-center">
                    API Github Users
                </Typography>
                <Typography variant="lead" className="text-center">
                    REACT - TAILDWIND
                </Typography>
                <div className="w-full max-w-md mx-auto mt-6 ">
                    <Input
                        type="text"
                        className="dark:text-white"
                        label="Buscar usuario..."
                        color={theme === "dark" ? "white" : "black"}
                        value={searchTerm}
                        // 1. Suaviza la búsqueda con `useTransition`:
                        // La actualización del estado se envuelve en startTransition para que React
                        // pueda priorizar otras tareas (como mantener el input responsivo).
                        onChange={(e) =>
                            startTransition(() => setSearchTerm(e.target.value))
                        }
                        icon={isPending && <Spinner className="h-5 w-5" />}
                    />
                </div>
            </header>

            {/* El Suspense ahora puede usar el Skeleton como fallback, o simplemente envolver la lista de usuarios reales. */}
            {isLoading ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-screen-2xl">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <li key={index} className="flex justify-center">
                            <SkeletonCard />
                        </li>
                    ))}
                </ul>
            ) : filteredUsers.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-screen-2xl">
                    {filteredUsers.map((item) => (
                        <li key={item.id} className="flex justify-center">
                            {/* 3. Suspense por tarjeta:
                                Cada tarjeta gestiona su propia carga. Si el bundle de UserCard
                                aún no ha llegado, esta tarjeta mostrará un SkeletonCard
                                sin afectar a las demás. */}
                            <Suspense fallback={<SkeletonCard />}>
                                <UserCard item={item} />
                            </Suspense>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center mt-10">
                    <Typography variant="h3" className="dark:text-gray-300">
                        No se encontraron usuarios con {searchTerm} .
                    </Typography>
                </div>
            )}
        </main>
    );
};

// Componentes de íconos para claridad
const MoonIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
    </svg>
);

const SunIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
    </svg>
);

export default App;
