
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FancyPageTransitionProps {
  children: React.ReactNode;
  location: string;
}

const FancyPageTransition: React.FC<FancyPageTransitionProps> = ({ children, location }) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FancyPageTransition;
