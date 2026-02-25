import type { ComponentPropsWithRef } from "react";

export interface FormInputProps {
  id?: string;
  name?: string;
  error?: boolean;
  required?: boolean;
}

export type InputPropsWithoutType = Omit<
  ComponentPropsWithRef<"input">,
  "type"
>;
