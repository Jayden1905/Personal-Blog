import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "../animation/motion";

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <motion.div
      className="max-w-3xl mx-auto"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
