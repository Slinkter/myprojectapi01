import React from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    CardHeader,
} from "@material-tailwind/react";

const UserCard = React.memo(({ item }) => (
    <Card className="w-72 sm:w-72 lg:w-72 shadow-md shadow-blue-gray-900/50 rounded-lg">
        <CardHeader
            floated={false}
            shadow={false}
            variant="filled"
            className="p-4 rounded-full"
        >
            <img
                src={item?.avatar_url}
                alt={item?.login}
                className="mx-auto mt-5 h-48 w-48  rounded-full object-cover object-center shadow-base shadow-blue-gray-900/50"
            />
        </CardHeader>
        <CardBody className="bg-white">
            <Typography
                variant="h4"
                color="blue-gray"
                className="bg-white text-center m-auto"
            >
                {item?.login}
            </Typography>
        </CardBody>
        <CardFooter className="pt-0 bg-white rounded-full">
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

export default UserCard;
