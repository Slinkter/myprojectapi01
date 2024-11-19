import { useEffect, useState, useCallback, useMemo } from "react";
import { Typography, Spinner } from "@material-tailwind/react";
import UserCard from "./components/UserCard";

// Componente optimizado con React.memo
const url = "https://api.github.com/users";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState([]);

    // Memorizar la función `getUsers` con useCallback para evitar recrearla en cada render
    const getUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch(url);
            const data = await res.json();
            if (!res.ok) {
                throw new Error(`${res.statusText} Error en el response `);
            }
            setUser(data);
            setIsError(null);
        } catch (error) {
            setIsError(error);
        } finally {
            setIsLoading(false);
        }
    }, []); // Dependencias vacías porque esta función solo necesita ser creada una vez

    useEffect(() => {
        getUsers(); // Se llama solo una vez al montar el componente
    }, [getUsers]);

    // Memorizar la lista de usuarios con useMemo para evitar recalcular la lista
    const userCards = useMemo(
        () => user.map((item) => <UserCard key={item.id} item={item} />),
        [user]
    );

    if (isLoading) {
        return (
            <div className="min-h-dvh  flex flex-col justify-center items-center">
                <Typography variant="h3">Loading ...</Typography>
                <Spinner className="h-24 w-24" color="indigo" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-dvh  flex flex-col justify-center items-center">
                <Typography variant="h3" color="red">
                    {isError?.message}
                </Typography>
            </div>
        );
    }

    console.log(user);

    return (
        <>
            <div className="min-h-dvh flex flex-col justify-center items-center p-6">
                <Typography variant="h1"> API Github Users</Typography>
                <Typography variant="lean">REACT - TAILDWIND</Typography>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-6 m-2 p-4 ">
                    {userCards}
                </ul>
            </div>
        </>
    );
};

export default App;
