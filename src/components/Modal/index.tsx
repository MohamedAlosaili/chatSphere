import { MouseEventHandler, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import Backdrop from "../Backdrop";
import Button from "../Button";

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 1,
    y: -30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};

export interface ModalProps {
  loading: boolean;
  close: () => void;
  children: ReactNode;
  actionName: string;
  actionHandler: MouseEventHandler;
  className?: string;
  title?: {
    text: string;
    icon?: ReactNode;
  };
}

const Modal = ({
  loading,
  close,
  children,
  actionName,
  actionHandler,
  className,
  title,
}: ModalProps) =>
  createPortal(
    <Backdrop onClick={() => (loading ? null : close())}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ y: { duration: 0.25, type: "Tween" } }}
        className={twMerge(
          `flex w-96 max-w-full cursor-auto flex-col gap-4 rounded-2xl bg-bcolor p-6 text-sm text-tcolor`,
          className
        )}
        onClick={e => e.stopPropagation()}
      >
        {title?.text && (
          <h1 className="flex items-center justify-center gap-2 text-xl font-semibold">
            {title.text} {title?.icon ?? ""}
          </h1>
        )}
        {children}
        <div className="flex gap-4">
          <Button
            onClick={() => (loading ? null : close())}
            className="flex-1"
            alt={true}
          >
            Cancel
          </Button>
          <Button
            onClick={e => (loading ? null : actionHandler(e))}
            className="flex-1"
          >
            {actionName}
          </Button>
        </div>
      </motion.div>
    </Backdrop>,
    document.getElementById("modal") as HTMLElement
  );

export default Modal;
