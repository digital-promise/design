import type { FormInputProps, InputPropsWithoutType } from "./types";

type CheckboxProps = InputPropsWithoutType &
  FormInputProps & {
    label: string;
  };

export const Checkbox = ({
  error,
  className,
  label,
  ...props
}: CheckboxProps) => {
  const fieldId = props.id || props.name;

  return (
    <div className="flex gap-3 items-center">
      <input
        type="checkbox"
        className={`transition-colors appearance-none cursor-pointer bg-neutral-1 border-2 border-gray-5 rounded-sm w-5 h-5 grid place-content-center hover:bg-gray-1 hover:border-neutral-5 before:hidden before:content-['\\2713'] before:text-neutral-1 before:font-bold checked:bg-blue-3 checked:border-blue-4 checked:hover:bg-blue-4 checked:hover:border-blue-5 checked:before:inline-block ${className ?? ""}`.trim()}
        {...props}
        id={fieldId}
      />
      <label
        data-error={error || null}
        htmlFor={fieldId}
        className="data-error:text-red-4"
      >
        {label}
      </label>
    </div>
  );
};
