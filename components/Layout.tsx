import { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "../animation/motion";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="max-w-3xl mx-auto px-4"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
