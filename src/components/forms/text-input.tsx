import type { ComponentPropsWithRef } from "react";
import type { FormInputProps } from "./types";

interface TextInputProps extends ComponentPropsWithRef<"input">, FormInputProps {}

export const TextInput = ({ error, className, ...props }: TextInputProps) => {
  return (
    <input
      data-error={error || null}
      className={`border border-gray-5 rounded-sm text-base leading-5 px-[0.94rem] py-[0.69rem] focus-within:border-transparent focus-within:outline-blue-4 data-error:border-red-4 data-error:outline-red-4 ${className ?? ""}`.trim()}
      {...props}
      type="text"
    />
  );
};
