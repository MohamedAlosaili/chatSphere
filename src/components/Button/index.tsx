import { twMerge } from "tailwind-merge";
import { motion, HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"button"> {
  alt?: boolean; // alternative button style
}

const Button = ({ className, alt = false, ...props }: Props) => (
  <motion.button
    whileHover={props.disabled ? {} : { scale: 1.1 }}
    whileTap={props.disabled ? {} : { scale: 0.95 }}
    className={twMerge(
      `mx-auto flex min-h-[2.5rem] items-center justify-center gap-2 rounded-xl px-6 py-2 text-sm font-medium text-white transition-colors bg-accent/75`,
      alt && "border-2 border-accent bg-transparent",
      props.disabled
        ? "opacity-50 transition-opacity"
        : alt
        ? "hover:bg-accent/25"
        : "hover:bg-accent/50",
      className
    )}
    {...props}
  />
);

export default Button;
