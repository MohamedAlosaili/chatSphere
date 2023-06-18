import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface NoResultProps extends ComponentProps<"p"> {
  value: string;
}

const NoResult = ({ value, className, ...props }: NoResultProps) => (
  <p className={twMerge("mt-4 text-center text-tcolor", className)} {...props}>
    No results for{" "}
        <span className="bg-accent/5 italic text-tcolor-2">{value}</span>
  </p>
);

export default NoResult;
