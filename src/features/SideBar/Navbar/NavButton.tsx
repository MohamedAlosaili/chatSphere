import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"button"> & { active: boolean };

const NavButton = ({ children, className, active, ...props }: Props) => (
  <button
    className={twMerge(
      `relative p-4 transition-colors hover:text-tcolor lg:w-full ${
        active ? "bg-accent/10 text-tcolor" : ""
      }`,
      className
    )}
    {...props}
  >
    <div className="lg:mx-auto lg:w-fit">{children}</div>
    <div
      className={`absolute bottom-0 left-1/2 h-2 -translate-x-1/2 transition-colors lg:left-0 lg:top-1/2 lg:h-3/4 lg:-translate-y-1/2 ${
        active ? "bg-accent" : "bg-transparent"
      } w-3/4 rounded-tl-md rounded-tr-md lg:w-2`}
    ></div>
  </button>
);

export default NavButton;
