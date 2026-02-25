import type { ComponentPropsWithRef } from "react";
import type { FormInputProps } from "./types";

interface TextareaProps extends ComponentPropsWithRef<"textarea">, FormInputProps {}

export const Textarea = ({ className, error, ...props }: TextareaProps) => {
  return (
    <textarea
      data-error={error || null}
      className={`border border-gray-5 rounded-sm text-base leading-5 px-[0.94rem] py-[0.69rem] focus-within:border-transparent focus-within:outline-blue-4 data-error:border-red-4 data-error:outline-red-4 ${className ?? ""}`.trim()}
      {...props}
    />
  );
};
