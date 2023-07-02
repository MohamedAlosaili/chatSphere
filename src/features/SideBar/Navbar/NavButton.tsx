import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import ToolTip from "@/components/ToolTip";

type Props = ComponentProps<"button"> & {
  active: boolean;
  toolTipText: string;
};

const NavButton = ({
  children,
  className,
  active,
  toolTipText,
  ...props
}: Props) => (
  <button
    className={twMerge(
      `group relative flex flex-1 flex-col items-center gap-1 p-2 transition-colors hover:text-tcolor focus:outline-none lg:w-full lg:flex-initial lg:p-4 ${
        active ? "bg-accent/10 text-tcolor" : ""
      }`,
      className
    )}
    {...props}
  >
    <div className="flex-1 lg:mx-auto lg:w-fit">{children}</div>
    <div
      className={`absolute bottom-0 left-1/2 h-1 -translate-x-1/2 transition-colors lg:left-0 lg:top-1/2 lg:h-3/4 lg:-translate-y-1/2 ${
        active ? "bg-accent" : "bg-transparent"
      } w-3/4 rounded-tl-md rounded-tr-md lg:w-2`}
    ></div>
    <ToolTip
      position="right"
      text={toolTipText}
      className="md:hidden lg:block"
    />
    <span className="w-max text-xs lg:hidden">{toolTipText}</span>
  </button>
);

export default NavButton;
