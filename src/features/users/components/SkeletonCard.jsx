import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";

const SkeletonCard = () => (
  <Card className="w-full max-w-xs shadow-lg rounded-xl animate-pulse bg-white dark:bg-dark-surface">
    <CardHeader
      shadow={false}
      floated={false}
      className="relative grid h-48 mx-auto place-items-center bg-gray-300 dark:bg-gray-700"
    >
      &nbsp;
    </CardHeader>
    <CardBody className="text-center">
      <div className="h-6 w-3/4 mx-auto rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </CardBody>
    <CardFooter className="pt-0">
      <div className="h-12 w-full rounded-lg bg-gray-300 dark:bg-gray-700"></div>
    </CardFooter>
  </Card>
);

export default SkeletonCard;
