import { ChangeEvent, ComponentProps, Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends Partial<ComponentProps<"input">> {
  // Value can be any type but for my inputs I just use strings
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<{ [key: string]: string }>>;
  label?: string;
  labelClassName?: string;
}

const Input = ({
  setValue,
  className,
  label,
  labelClassName,
  ...props
}: InputProps) => {
  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValue(prevValue => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <label className={twMerge(`flex flex-col gap-2`, labelClassName)}>
      {label}
      <input
        type="text"
        {...props}
        className={twMerge(
          `rounded-xl border-2 border-accent/20 bg-accent/10 p-3 caret-accent transition-colors focus:border-accent/40 focus:bg-transparent focus:outline-none ${
            props.disabled ? "cursor-pointer" : ""
          }`,
          className
        )}
        onChange={updateValue}
      />
    </label>
  );
};

export default Input;
