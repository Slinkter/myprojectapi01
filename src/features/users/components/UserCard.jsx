/**
 * @file User Card Component
 * @description Compact user card with Motion animations
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
      whileHover={{ y: -2 }}
    >
      <Card
        className="
          w-64 overflow-hidden rounded-xl
          bg-white dark:bg-dark-surface
          border border-gray-200 dark:border-dark-border
          shadow-sm hover:shadow-md
        "
        shadow={false}
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-auto mt-6 mb-2 flex h-20 w-20 justify-center items-center bg-transparent"
        >
          <img
            src={avatar_url}
            alt={`Avatar de ${login}`}
            loading="lazy"
            className="h-20 w-20 rounded-full object-cover border-2 border-gray-100 dark:border-dark-border"
          />
        </CardHeader>
        <CardBody className="text-center pb-2 px-4">
          <Typography
            variant="h5"
            className="text-base font-medium text-gray-900 dark:text-dark-text"
          >
            {login}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 px-4 pb-4 flex flex-col gap-2">
          <Link to={`/user/${login}`}>
            <Button
              color="blue"
              variant="filled"
              size="sm"
              className="w-full text-sm"
            >
              Ver Detalles
            </Button>
          </Link>
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver el perfil de ${login} en Github`}
          >
            <Button
              variant="outlined"
              color="blue"
              size="sm"
              className="w-full text-sm"
            >
              GitHub
            </Button>
          </a>
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
