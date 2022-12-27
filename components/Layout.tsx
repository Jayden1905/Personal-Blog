import { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "../animation/motion";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
