import { motion } from "framer-motion";

export default function Transicion({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
