import { motion } from "framer-motion";
import { MouseEventHandler, ReactNode } from "react";

const opacityVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface Props {
  onClick: MouseEventHandler;
  children: ReactNode;
}

const Backdrop = ({ onClick, children }: Props) => (
  <motion.div
    variants={opacityVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    onClick={onClick}
    className={`fixed inset-0 z-40 flex cursor-pointer items-center justify-center bg-accent/10 p-4 backdrop-blur-md`}
  >
    {children}
  </motion.div>
);
export default Backdrop;
