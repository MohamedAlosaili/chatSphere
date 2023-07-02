import { ComponentProps, FormEvent } from "react";
import { ImSearch } from "react-icons/im";
import { CgSpinner } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

import Input, { InputProps } from "@/components/Input";

interface SearchProps
  extends Pick<InputProps, "value" | "setValue">,
    Partial<ComponentProps<"form">> {
  onSubmit: (e: FormEvent) => void;
  loading: boolean;
  result: number;
}

const Search = ({
  value,
  setValue,
  loading,
  result,
  ...props
}: SearchProps) => {
  return (
    <form
      className={twMerge(`relative text-tcolor`, props.className)}
      {...props}
    >
      <Input
        type="search"
        name="search"
        value={value}
        disabled={loading}
        setValue={setValue}
        inputMode="search"
        placeholder={props.placeholder ? props.placeholder : "Search..."}
        className="pr-10 focus:border-accent/75  focus:bg-accent/5"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-accent">
        {loading && result === 0 ? (
          <CgSpinner className="animate-[spin_0.5s_linear_infinite;] text-2xl" />
        ) : (
          <ImSearch />
        )}
      </div>
    </form>
  );
};

export default Search;
