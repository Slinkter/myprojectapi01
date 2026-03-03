/**
 * @file User Card Component
 * @description User card with Motion animations - Mobile First
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  CardHeader,
} from "@material-tailwind/react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
};

/**
 * User Card Component
 * @component
 * @description Displays user info with Motion animations
 */
const UserCard = React.memo(({ user = {} }) => {
  const { avatar_url, login, html_url } = user;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
    >
      <Card
        className="
          w-full overflow-hidden rounded-xl
          bg-white dark:bg-dark-surface
          border border-gray-200 dark:border-dark-border
          shadow-md hover:shadow-xl
          transition-all duration-200
        "
        shadow={false}
      >
        <CardHeader
          floated={false}
          shadow={false}
          className="h-32 sm:h-40 bg-gradient-to-r from-accent-500 to-accent-600 dark:from-accent-600 dark:to-accent-700 m-0"
        >
          <div className="h-full w-full flex items-center justify-center pt-8 sm:pt-10">
            <img
              src={avatar_url}
              alt={`Avatar de ${login}`}
              loading="lazy"
              className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-4 border-white dark:border-dark-surface shadow-lg -mt-8 sm:-mt-10"
            />
          </div>
        </CardHeader>
        <CardBody className="text-center pb-2 pt-8 sm:pt-10 px-4">
          <Typography
            variant="h4"
            className="text-base sm:text-lg font-semibold text-gray-900 dark:text-dark-text truncate px-2"
          >
            {login}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 px-4 pb-4">
          <Link to={`/user/${login}`}>
            <Button
              color="blue"
              variant="filled"
              size="sm"
              className="w-full"
            >
              Ver Perfil
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
});

UserCard.displayName = "UserCard";

UserCard.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    login: PropTypes.string,
    html_url: PropTypes.string,
  }).isRequired,
};

export default UserCard;
