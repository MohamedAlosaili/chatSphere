import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"button"> & { active: boolean };

const NavButton = ({ children, className, active, ...props }: Props) => (
  <button
    className={twMerge(
      `relative transition-colors p-4 hover:text-tcolor lg:w-full ${
        active ? "text-tcolor bg-accent/10" : ""
      }`,
      className
    )}
    {...props}
  >
    <div className="lg:w-fit lg:mx-auto">{children}</div>
    <div
      className={`transition-colors absolute bottom-0 left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:left-0 -translate-x-1/2 h-2 lg:h-3/4 ${
        active ? "bg-accent" : "bg-transparent"
      } w-3/4 lg:w-2 rounded-tl-md rounded-tr-md`}
    ></div>
  </button>
);

export default NavButton;
