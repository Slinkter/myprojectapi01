import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState([]);

    const getUsers = async () => {
        try {
            setIsLoading(true);
            const url = "https://api.github.com/users";
            const res = await fetch(url);
            const data = await res.json();
            if (!res.ok) {
                throw Error("error en el res");
            }
            if (!res) {
                throw Error("error en el res");
            }
            setUser(data);
            setIsError(null);
            console.log(res);
            console.log(data);
        } catch (error) {
            setIsError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    if (isLoading) {
        return (
            <div className="h-dvh flex flex-col justify-center items-center  ">
                <Typography variant="h3" color="">
                    Loading ...
                </Typography>
                <Spinner className="h-24 w-24" color="indigo" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="h-dvh flex flex-col justify-center items-center  ">
                <Typography variant="h3" color="red">
                    {isError?.message}
                </Typography>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center bg-blue-gray-900/50 ">
                <Typography variant="h1" color="">
                    Git users
                </Typography>
                <Typography variant="paragraph" color="">
                    API de users - react-vite - material taildwind
                </Typography>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-6  m-2 ">
                    {user.map((item) => (
                        <Card
                            className=" w-80  sm:w-80 lg:w-72 shadow-md shadow-blue-gray-900/50"
                            key={item.id}
                        >
                            <img
                                src={item.avatar_url}
                                alt={item.login}
                                className="mx-auto mt-5 h-48 w-48 rounded-full object-cover object-center shadow-md shadow-blue-gray-900/50"
                            />
                            <CardBody>
                                <Typography
                                    variant="h4"
                                    color="blue-gray"
                                    className=" text-center m-auto"
                                >
                                    {item.login}
                                </Typography>
                            </CardBody>

                            <CardFooter className="pt-0">
                                <a href={item.html_url}>
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
                    ))}
                </ul>
            </div>
        </>
    );
};

export default App;
