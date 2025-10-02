import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "@material-tailwind/react";

const SkeletonCard = () => (
    <Card className="w-full max-w-xs shadow-lg rounded-xl animate-pulse">
        <CardHeader
            shadow={false}
            floated={false}
            className="relative grid h-48 mx-auto place-items-center bg-gray-300"
        ></CardHeader>
        <CardBody className="text-center">
            <div className="h-6 w-3/4 mx-auto bg-gray-300 rounded-full"></div>
        </CardBody>
        <CardFooter className="pt-0">
            <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
        </CardFooter>
    </Card>
);

export default SkeletonCard;
