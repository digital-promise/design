import type { ButtonHTMLAttributes } from "react";

const variants = ["primary", "secondary", "tertiary"] as const;
const states = ["default", "danger", "inverse", "decolor"] as const;

export type ButtonVariant = (typeof variants)[number];
export type ButtonState = (typeof states)[number];

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  state?: ButtonState;
};

export { variants, states };

export function getButtonClassName({
  className,
  variant = "primary",
  state = "default",
}: Pick<ButtonProps, "className" | "variant" | "state">) {
  const style = [variant, state].map((c) => "btn-" + c).join(" ");
  return `btn ${style} ${className ?? ""}`.trim();
}

export default function Button({
  className,
  variant = "primary",
  state = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClassName({ className, variant, state })}
      {...props}
    />
  );
}
