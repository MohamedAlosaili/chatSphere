import { ChangeEvent, ComponentProps, ReactNode } from "react";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<ComponentProps<"label">, "children"> {
  accept: "image" | "image, video";
  setFile: (file: File) => void;
  children: ReactNode;
  disabled?: boolean;
}

const InputFile = ({
  setFile,
  accept,
  children,
  className = "",
  disabled = false,
  ...props
}: Props) => {
  const updateFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const acceptableTypes = accept.split(", ");

    const invalidType = !acceptableTypes.some(type =>
      file.type.startsWith(type)
    );

    if (invalidType) {
      return toast.error(`Invalid file type, only ${accept} type`);
    }

    setFile(file);
  };

  return (
    <label
      className={twMerge(
        `group ${!disabled ? "cursor-pointer" : ""}`,
        className
      )}
      {...props}
    >
      {children}
      <input
        type="file"
        disabled={disabled}
        className="hidden"
        value=""
        onChange={updateFile}
      />
    </label>
  );
};

export default InputFile;
