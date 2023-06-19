import { ComponentProps } from "react";
import scrollStyle from "./scrollable.module.scss";

const Scrollable = ({
  className,
  children,
  hide,
  ...props
}: ComponentProps<"div"> & { hide?: boolean }) => {
  return (
    <div
      {...props}
      className={
        scrollStyle[`scrollable${hide ? "--hide" : ""}`] + " " + className
      }
    >
      {children}
    </div>
  );
};

export default Scrollable;
