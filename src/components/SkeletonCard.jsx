import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "@material-tailwind/react";

const SkeletonCard = () => (
    <Card className="skeleton-card">
        <CardHeader
            shadow={false}
            floated={false}
            className="skeleton-card__header"
        >
            &nbsp;
        </CardHeader>
        <CardBody className="text-center">
            <div className="skeleton-card__body-line"></div>
        </CardBody>
        <CardFooter className="pt-0">
            <div className="skeleton-card__footer-line"></div>
        </CardFooter>
    </Card>
);

export default SkeletonCard;
