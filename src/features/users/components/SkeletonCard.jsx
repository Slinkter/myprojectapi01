/**
 * @file Skeleton Card Component
 * @description Loading placeholder matching UserCard dimensions
 */

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";

const SkeletonCard = () => (
  <Card
    className="
      w-full max-w-[280px] overflow-hidden rounded-xl
      bg-white dark:bg-dark-surface
      border border-gray-200 dark:border-dark-border
      shadow-sm animate-pulse
    "
    shadow={false}
  >
    <CardHeader
      shadow={false}
      floated={false}
      className="mx-auto mt-6 mb-2 flex h-16 w-16 sm:h-20 sm:w-20 justify-center items-center bg-transparent"
    >
      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
    </CardHeader>
    <CardBody className="text-center pb-2 px-4">
      <div className="h-5 w-24 mx-auto rounded-full bg-gray-200 dark:bg-gray-700" />
    </CardBody>
    <CardFooter className="pt-0 px-4 pb-4 flex flex-col gap-2">
      <div className="h-8 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="h-8 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
    </CardFooter>
  </Card>
);

export default SkeletonCard;
