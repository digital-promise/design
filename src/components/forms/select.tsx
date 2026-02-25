import { ComponentPropsWithRef } from "react";
import { FormInputProps } from "./types";

export interface SelectProps extends ComponentPropsWithRef<"select">, FormInputProps {
  options: { value: string; label: string }[];
}

export const Select = ({
  options,
  error,
  className,
  ...props
}: SelectProps) => {
  return (
    <select
      {...props}
      data-error={error || null}
      className={`border border-gray-5 rounded-sm text-base leading-5 px-[0.94rem] py-[0.69rem] focus-within:border-transparent focus-within:outline-blue-4 data-error:border-red-4 data-error:outline-red-4 ${className ?? ""}`.trim()}
    >
      {options.map((o) => (
        <option className="hover:bg-gray-3" key={[props.name, o.label].join()} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};
