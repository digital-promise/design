import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary";
  state?: "default" | "danger" | "inverse" | "decolor";
};

export default function Button({
  className,
  variant = "primary",
  state = "default",
  ...props
}: ButtonProps) {
  const style = [variant, state].map((c) => "btn-" + c).join(" ");
  return <button className={`btn ${style} ${className ?? ""}`.trim()} {...props} />;
}
