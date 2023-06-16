import { ComponentProps } from "react";

interface UsersListProps extends ComponentProps<"details"> {
  label: "online" | "offline";
  total: number;
}

const UsersList = ({ label, total, children, ...props }: UsersListProps) => (
  <details className="group mt-4" {...props}>
    <summary className="flex cursor-pointer select-none items-center justify-between rounded-xl bg-accent/10 px-3 py-2 text-lg text-tcolor group-open:mb-4">
      <div className="mr-auto flex items-center gap-2 capitalize">
        {label}
        <span
          className={`block aspect-square w-2 rounded-full ${
            label === "online" ? "bg-green-500" : "bg-green-100"
          }  px-1 text-xs text-tcolor`}
        ></span>
        <span className="text-sm">{`(${total})`}</span>
      </div>
      <div className="relative h-5 w-10 rounded-full bg-accent/[.15] transition-colors group-open:bg-accent/75">
        <span className="absolute left-px top-1/2 block h-[1.1rem] w-[1.1rem] -translate-y-1/2 translate-x-0 rounded-full bg-tcolor transition-all active:w-[1.5rem] group-open:left-full group-open:-translate-x-[calc(100%+1px)] group-active:w-[1.5rem] "></span>
      </div>
    </summary>
    {children}
  </details>
);

export default UsersList;
