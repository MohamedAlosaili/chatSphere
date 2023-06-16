import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import CardSkeleton from "./CardSkeleton";

const Card = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={twMerge(
      `mb-4 grid cursor-pointer grid-cols-[3.5rem,_1fr,auto] gap-4 rounded-2xl p-4 transition-colors last:mb-0 hover:bg-bcolor/30 active:bg-bcolor/50`,
      className
    )}
    {...props}
  ></div>
);

export const CardsSkeleton = ({ size }: { size: number }) => {
  const cards = [];

  for (let i = 0; i < size; i++) {
    cards.push(<CardSkeleton key={i} />);
  }

  return <>{cards}</>;
};

export default Card;
