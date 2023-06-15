import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const SkeletonLoader = (props: ComponentProps<"div">) => (
  <div
    {...props}
    className={twMerge(
      `h-full w-full animate-pulse bg-accent/25`,
      props.className
    )}
  ></div>
);

export default SkeletonLoader;
