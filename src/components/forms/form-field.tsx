import { FormInputProps } from "./types";
import { Label } from "./label";

interface FormFieldProps<C extends FormInputProps> {
  Input: React.ComponentType<C>;
  inputProps: C;
  errorMessage?: string;
  label: string;
  labelClassname?: string;
}

export const FormField = <P extends FormInputProps>({
  Input,
  inputProps,
  errorMessage,
  label,
  labelClassname,
}: FormFieldProps<P>) => {
  const hasError = Boolean(errorMessage);
  const fieldId = inputProps?.id || inputProps?.name;

  return (
    <div className="flex flex-col gap-3">
      <Label
        label={label}
        className={labelClassname}
        htmlFor={fieldId}
        required={inputProps?.required}
        error={hasError}
      />

      <Input error={hasError} {...inputProps} id={fieldId} />

      {errorMessage && <p className="text-red-4">{errorMessage}</p>}
    </div>
  );
};
