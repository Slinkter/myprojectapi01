/**
 * @file User List Component (Data Model Sincronized)
 * @description Uses the standardized UserProfile model from the adapter.
 */

import React from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "motion/react";
import ResultFactory from "@/components/factories/ResultFactory";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
};

const UserList = ({ users }) => {
  return (
    <div className="layout-stack py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 pt-2 -mt-2"
      >
        <AnimatePresence mode="popLayout">
          {users.map((user) => (
            <motion.div
              key={user.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ResultFactory data={user} variant="glass" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

UserList.propTypes = {
  // Array of standardized UserProfile objects
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default React.memo(UserList);
