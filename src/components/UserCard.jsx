import React, { useRef } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    CardHeader,
} from "@material-tailwind/react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const UserCard = React.memo(({ user = {} }) => {
    const { avatar_url, login, html_url } = user;
    const cardRef = useRef(null);
    const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });

    const cardClasses = [
        "w-full max-w-xs shadow-md hover:shadow-2xl rounded-xl overflow-hidden",
        "bg-white transition-all duration-100 dark:bg-gray-600",
        isVisible ? "animate-scale-in" : "opacity-0",
    ].join(" ");

    return (
        <Card ref={cardRef} className={cardClasses}>
            <CardHeader
                floated={false}
                shadow={false}
                className="mx-auto mt-6 rounded-full object-cover object-center"
            >
                <img
                    src={avatar_url}
                    alt={`Avatar de ${login}`}
                    loading="lazy"
                    className="h-40 w-40 rounded-full object-cover object-center shadow-md"
                />
            </CardHeader>
            <CardBody className="text-center">
                <Typography
                    variant="h4"
                    color="blue-gray"
                    className="mb-2 dark:text-white"
                >
                    {login}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <a
                    href={html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver el perfil de ${login} en Github`}
                >
                    <Button
                        color="amber"
                        size="lg"
                        className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                        fullWidth={true}
                    >
                        Profile Github
                    </Button>
                </a>
            </CardFooter>
        </Card>
    );
});

UserCard.displayName = "UserCard";

export default UserCard;
