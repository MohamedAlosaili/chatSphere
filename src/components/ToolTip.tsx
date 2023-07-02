import { CSSProperties, ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface ToolTipProps extends ComponentProps<"div"> {
  position: "top" | "right" | "bottom" | "left";
  text: string;
}

const positions = {
  top: {
    "--top": "auto",
    "--bottom": "100%",
    "--right": "auto",
    "--left": "50%",
    "--translate-x": "-50%",
    "--translate-y": "-1.5rem",
  },
  right: {
    "--top": "50%",
    "--bottom": "auto",
    "--right": "auto",
    "--left": "100%",
    "--translate-x": "1.5rem",
    "--translate-y": "-50%",
  },
  bottom: {
    "--top": "100%",
    "--bottom": "auto",
    "--right": "auto",
    "--left": "50%",
    "--translate-x": "-50%",
    "--translate-y": "1.5rem",
  },
  left: {
    "--top": "50%",
    "--bottom": "auto",
    "--right": "100%",
    "--left": "auto",
    "--translate-x": "-1.5rem",
    "--translate-y": "-50%",
  },
};

const arrowPos = {
  top: {
    "--top": "100%",
    "--bottom": "auto",
    "--left": "50%",
    "--right": "auto",
    "--translate-x": "-50%",
    "--translate-y": "-0.1rem",
    "--shape": "0 0, 100% 0, 50% 100%",
    "--width": "1.5rem",
    "--height": "0.75rem",
  },
  right: {
    "--top": "50%",
    "--bottom": "auto",
    "--left": "auto",
    "--right": "100%",
    "--translate-x": "0.1rem",
    "--translate-y": "-50%",
    "--shape": "100% 0, 100% 100%, 0 50%",
    "--width": "0.75rem",
    "--height": "1.25rem",
  },
  bottom: {
    "--top": "auto",
    "--bottom": "100%",
    "--left": "50%",
    "--right": "auto",
    "--translate-x": "-50%",
    "--translate-y": "0.1rem",
    "--shape": "50% 0, 100% 100%, 0 100%",
    "--width": "1.5rem",
    "--height": "0.75rem",
  },
  left: {
    "--top": "50%",
    "--bottom": "auto",
    "--left": "100%",
    "--right": "auto",
    "--translate-x": "-0.1rem",
    "--translate-y": "-50%",
    "--shape": "0 0, 100% 50%, 0 100%",
    "--width": "0.75rem",
    "--height": "1.25rem",
  },
};

const ToolTip = ({ position, text, ...props }: ToolTipProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 scale-100">
      <div
        {...props}
        style={{ ...props.style, ...positions[position] }}
        className={twMerge(
          `invisible bottom-[--bottom] left-[--left] right-[--right] top-[--top] hidden translate-x-[--translate-x] translate-y-[--translate-y] rounded-xl bg-bcolor  opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100 md:visible md:absolute md:block`,
          props.className
        )}
      >
        <div className="pointer-events-none w-max rounded-xl bg-accent/10 px-6 py-3 text-sm font-medium text-tcolor ">
          {text}
        </div>
        <div
          style={arrowPos[position] as CSSProperties}
          className="absolute bottom-[--bottom] left-[--left] right-[--right] top-[--top] h-[--height] w-[--width] translate-x-[--translate-x] translate-y-[--translate-y] overflow-hidden bg-inherit [clip-path:polygon(var(--shape))]"
        >
          <div className="h-full w-full bg-accent/10"></div>
        </div>
      </div>
    </div>
  );
};

export default ToolTip;
