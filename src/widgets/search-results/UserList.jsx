

import React from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "motion/react";
import { ResultFactory } from "@/entities/user";



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


const UserList = ({ userList }) => {
  return (
    <div className="w-full py-4">
      <div className="divider mb-6" />
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[10px] tracking-wider text-text-mute font-bold">
          {userList.length} RESULTADO{userList.length !== 1 ? "S" : ""}
        </span>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6"
      >
        {}
        <AnimatePresence mode="popLayout">
          {userList.map((userProfile) => (
            <motion.div
              key={userProfile.id} 

              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              {}
              <ResultFactory userProfile={userProfile} variant="default" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

UserList.propTypes = {
  userList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

UserList.displayName = "UserList";

export default React.memo(UserList);
