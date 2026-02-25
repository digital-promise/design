import { ComponentPropsWithRef } from "react";

type FormProps = ComponentPropsWithRef<"form">;

export const Form = ({ noValidate, className, ...props }: FormProps) => {
  return (
    <form
      className={`container flex flex-col gap-7 max-w-[45rem] ${className ?? ""}`.trim()}
      {...props}
      noValidate={noValidate ?? true}
    />
  );
};
