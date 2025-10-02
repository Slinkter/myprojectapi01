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

const UserCard = React.memo(({ item }) => {
    const cardRef = useRef(null);
    const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });

    return (
        <Card
            ref={cardRef}
            className={`w-full max-w-xs shadow-lg hover:shadow-xl rounded-xl overflow-hidden bg-white dark:bg-gray-800 transition-all duration-500 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
        >
            <CardHeader floated={false} shadow={false} className="mx-auto mt-6">
                <img
                    src={item?.avatar_url}
                    alt={item?.login}
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
                    {item?.login}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    as="a"
                    href={item?.html_url}
                    color="amber"
                    size="lg"
                    className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                    ripple={true}
                    fullWidth={true}
                >
                    Profile Github
                </Button>
            </CardFooter>
        </Card>
    );
});
UserCard.displayName = "UserCard";

export default UserCard;
