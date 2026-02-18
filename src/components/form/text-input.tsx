import { ComponentPropsWithRef } from "react";

export interface TextInputProps extends ComponentPropsWithRef<"input"> {
  type: "text";
  error?: boolean;
}

export const TextInput = ({ className, error, ...props }: TextInputProps) => {
  return <input data-error={error || null} className={`border border-gray-5 rounded-sm text-base leading-5 px-[0.94rem] py-[0.69rem] focus-within:border-transparent focus-within:outline-blue-4 data-error:border-red-4 data-error:outline-red-4`} {...props} />;
};
