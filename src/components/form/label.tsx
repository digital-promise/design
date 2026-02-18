import { type ComponentProps } from "react";

export interface LabelProps extends ComponentProps<"label"> {
  label: string;
  error?: boolean;
  required?: boolean;
}

export const Label = ({
  className,
  label,
  required,
  error,
  ...props
}: LabelProps) => {
  return (
    <label
      data-required={required || null}
      data-error={error || null}
      {...props}
      className="text-base font-medium leading-5 data-error:text-red-4 data-required:after:content-['*'] data-required:after:text-red-4 data-required:after:ml-1"
    >
      {label}
    </label>
  );
};
