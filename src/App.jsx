import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Spinner,
} from "@material-tailwind/react";

// Componente optimizado con React.memo
const UserCard = React.memo(({ item }) => (
    <Card className="w-80 sm:w-80 lg:w-72 shadow-md shadow-blue-gray-900/50">
        <img
            src={item?.avatar_url}
            alt={item?.login}
            className="mx-auto mt-5 h-48 w-48 rounded-full object-cover object-center shadow-md shadow-blue-gray-900/50"
        />
        <CardBody>
            <Typography
                variant="h4"
                color="blue-gray"
                className="text-center m-auto"
            >
                {item?.login}
            </Typography>
        </CardBody>
        <CardFooter className="pt-0">
            <a href={item?.html_url}>
                <Button
                    color="amber"
                    size="lg"
                    className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                    ripple={true}
                    fullWidth={true}
                >
                    Profile Github
                </Button>
            </a>
        </CardFooter>
    </Card>
));
UserCard.displayName = "UserCard";
const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState([]);

    // Memorizar la función `getUsers` con useCallback para evitar recrearla en cada render
    const getUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            const url = "https://api.github.com/users";
            const res = await fetch(url);
            const data = await res.json();
            if (!res.ok) {
                throw new Error("Error en el res");
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
    ); // Solo se recalcula si `user` cambia

    if (isLoading) {
        return (
            <div className="h-dvh flex flex-col justify-center items-center">
                <Typography variant="h3">Loading ...</Typography>
                <Spinner className="h-24 w-24" color="indigo" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="h-dvh flex flex-col justify-center items-center">
                <Typography variant="h3" color="red">
                    {isError?.message}
                </Typography>
            </div>
        );
    }

    console.log(user);

    return (
        <>
            <div className="flex flex-col justify-center items-center bg-blue-gray-900/50">
                <Typography variant="h1">Git users</Typography>
                <Typography variant="lean">
                    API de users - react-vite - material taildwind
                </Typography>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-6 m-2">
                    {userCards}
                </ul>
            </div>
        </>
    );
};

export default App;
