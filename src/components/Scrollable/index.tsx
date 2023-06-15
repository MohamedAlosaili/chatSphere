import { ComponentProps } from "react";
import scrollStyle from "./scrollable.module.scss";

const Scrollable = (props: ComponentProps<"div">) => {
  return (
    <div {...props}>
      <div className={scrollStyle.scrollable}>{props.children}</div>
    </div>
  );
};

export default Scrollable;
