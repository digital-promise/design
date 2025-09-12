import type { ButtonHTMLAttributes } from "react";

const variants = ["primary", "secondary", "tertiary"] as const;
const states = ["default", "danger", "inverse", "decolor"] as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: (typeof variants)[number];
  state?: (typeof states)[number];
};

export { variants, states };

export default function Button({
  className,
  variant = "primary",
  state = "default",
  ...props
}: ButtonProps) {
  const style = [variant, state].map((c) => "btn-" + c).join(" ");
  return (
    <button className={`btn ${style} ${className ?? ""}`.trim()} {...props} />
  );
}
