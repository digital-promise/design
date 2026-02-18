import { type TextInputProps, TextInput } from "./text-input";
import { type LabelProps, Label } from "./label";

interface FieldProps extends TextInputProps {
  name: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
}

export const Field = ({
  name,
  label,
  error,
  required,
  className,
  errorMessage,
  ...props
}: FieldProps) => {
  const hasError = error || Boolean(errorMessage);

  return (
    <div className="flex flex-col gap-3">
      <Label
        label={label}
        htmlFor={name}
        required={required}
        error={hasError}
      />
      <TextInput name={name} id={name} error={hasError} {...props} />
      {errorMessage && <p className="text-red-4">{errorMessage}</p>}
    </div>
  );
};
