import { ComponentProps } from "react";
import scrollStyle from "./scrollable.module.scss";

const Scrollable = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div {...props} className={scrollStyle.scrollable + " " + className}>
      {children}
    </div>
  );
};

export default Scrollable;
