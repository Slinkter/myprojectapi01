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
import { useFetch } from "./hooks/useFetch.js";
import { useTheme } from "./hooks/useTheme.js";
import { SkeletonCard } from "./components/SkeletonCard";
import { MoonIcon, SunIcon } from "./assets/Icons.jsx";

const UserCard = lazy(() => import("./components/UserCard"));

// URL de la API de GitHub para obtener usuarios
const API_URL = "https://api.github.com/users";

// 1. useTransition para que la UI no se bloquee al filtrar.
// 2. Preload del componente:
// Disparamos la descarga del código de UserCard en paralelo a la petición de datos.
// Así, cuando los datos lleguen, el componente ya estará listo para renderizarse.
// Filtra los usuarios basándose en el término de búsqueda.
// `useMemo` es crucial aquí para optimizar el rendimiento,
// ya que evita recalcular la lista en cada render, solo cuando `users` o `searchTerm` cambian.// Filtra los usuarios basándose en el término de búsqueda.
// `useMemo` es crucial aquí para optimizar el rendimiento,
// ya que evita recalcular la lista en cada render, solo cuando `users` o `searchTerm` cambian.
/* 3. Suspense por tarjeta:
Cada tarjeta gestiona su propia carga. Si el bundle de UserCard
  aún no ha llegado, esta tarjeta mostrará un SkeletonCard. */
const App = () => {
    const [theme, toggleTheme] = useTheme(); // Hook para gestionar el tema (claro/oscuro)
    const [searchTerm, setSearchTerm] = useState("");
    const { data: users, isLoading, error, refetch } = useFetch(API_URL); // Utiliza el custom hook `useFetch`
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        import("./components/UserCard");
    }, []);

    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter((user) =>
            user.login.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // Muestra un mensaje de error con un botón para reintentar.
    if (error) {
        return (
            <div className="center-container">
                <Typography variant="h3" color="red" className="text-center">
                    {error.message}
                </Typography>
                <Button color="blue" onClick={refetch} className="mt-4 ">
                    Reintentar
                </Button>
            </div>
        );
    }

    return (
        <main className="main-container">
            <header className="main-header">
                <div className="flex justify-end mb-4 border-2">
                    <IconButton
                        variant="text"
                        className="theme-toggle-button"
                        onChange={toggleTheme}
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                    </IconButton>
                </div>
                <Typography
                    variant="h1"
                    className="main-header-h1 text-brand-dark dark:text-brand-light"
                >
                    API Github Users
                </Typography>

                {/* EJEMPLO DE PLUGIN: @tailwindcss/typography */}
                <article className="text-center prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert mx-auto mt-8">
                    <p>
                        Este proyecto demuestra las capacidades de React 18 con
                        renderizado concurrente y Tailwind CSS .
                    </p>
                </article>
                <div className="search-container">
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
                // Mostramos una cuadrícula de esqueletos durante la carga inicial
                <ul className="user-list">
                    {Array.from({ length: 100 }).map((_, index) => (
                        <li
                            key={index}
                            className="flex justify-center animate-fade-in-up"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animationFillMode: "backwards",
                            }}
                        >
                            <SkeletonCard />
                        </li>
                    ))}
                </ul>
            ) : filteredUsers.length > 0 ? (
                <ul className="user-list">
                    {filteredUsers.map((item, index) => (
                        <li
                            key={item.id}
                            className="flex justify-center animate-fade-in-up"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animationFillMode: "backwards",
                            }}
                        >
                            <Suspense fallback={<SkeletonCard />}>
                                <UserCard item={item} />
                            </Suspense>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center mt-10 animate-fade-in">
                    <Typography variant="h3" className="dark:text-gray-300">
                        No se encontraron usuarios con {searchTerm} .
                    </Typography>
                </div>
            )}
        </main>
    );
};

export default App;
