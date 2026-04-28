import type { DPGIconName } from "@digitalpromise/icons";
import type { ComponentPropsWithRef, ReactNode } from "react";
import {
  getButtonClassName,
  type ButtonState,
  type ButtonVariant,
} from "./button";
import { Icon } from "./icon";

export const iconButtonStates = [
  "default",
  "danger",
  "inverse",
  "emphasize",
  "decolor",
] as const;
export const iconButtonSizes = ["md", "sm", "xs"] as const;
export const iconButtonVariants = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "outline",
] as const;

type IconButtonState = (typeof iconButtonStates)[number];
type IconButtonSize = (typeof iconButtonSizes)[number];
type IconOnlyVariant = Extract<
  (typeof iconButtonVariants)[number],
  "ghost" | "outline"
>;
type ButtonStyleVariant = Extract<ButtonVariant, "primary" | "secondary">;
type TextVariant = ButtonStyleVariant | "tertiary";
type IconButtonVariant = IconOnlyVariant | TextVariant;
type IconPosition = "start" | "end";

export type IconButtonProps = ComponentPropsWithRef<"button"> & {
  icon?: DPGIconName;
  iconClassName?: string;
  textClassName?: string;
  label: string;
  children?: ReactNode;
  state?: IconButtonState;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  iconPosition?: IconPosition;
};

const iconOnlyBaseClassName =
  "inline-flex items-center justify-center rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-4 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

const iconOnlySizeClassName: Record<IconButtonSize, string> = {
  md: "h-12 w-12 p-3",
  sm: "h-8 w-8 p-2",
  xs: "h-6 w-6 p-0",
};

const iconOnlyStateClassName: Record<IconButtonState, string> = {
  default: "text-gray-5 hover:text-neutral-5 transition-colors",
  danger: "text-red-4 hover:text-red-5",
  inverse: "text-white hover:text-gray-1",
  emphasize:
    "bg-white text-gray-5 hover:bg-gray-1 hover:text-neutral-5 focus-visible:bg-blue-1 focus-visible:text-blue-4 focus-visible:hover:bg-blue-2 focus-visible:hover:text-blue-5",
  decolor: "text-gray-5 hover:text-neutral-5 transition-colors",
};

const iconOnlyVariantClassName: Record<IconOnlyVariant, string> = {
  ghost: "",
  outline: "border-2 border-gray-5",
};

const tertiaryStateClassName: Record<IconButtonState, string> = {
  default: "flex items-center gap-2 py-3 text-gray-5",
  danger: "flex items-center gap-2 py-3 text-red-4 hover:text-red-5",
  inverse: "flex items-center gap-2 py-3 text-white hover:text-gray-1",
  emphasize: "flex items-center gap-2 py-3 text-gray-5",
  decolor: "flex items-center gap-2 py-3 text-gray-5 hover:text-neutral-5",
};

const textButtonLayoutClassName =
  "inline-flex items-center justify-center gap-2";

function getIconGlyphClassName(size: IconButtonSize, className?: string) {
  const sizeClassName =
    size === "xs"
      ? "block h-5 w-5 shrink-0 leading-none"
      : size === "sm"
        ? "block h-4 w-4 shrink-0 text-base leading-none"
        : "block h-6 w-6 shrink-0 text-2xl leading-none";

  return `${sizeClassName} ${className ?? ""}`.trim();
}

function getIconButtonClassName({
  className,
  size = "md",
  state = "default",
  variant = "ghost",
}: Pick<IconButtonProps, "className" | "size" | "state" | "variant">) {
  if (variant === "primary" || variant === "secondary") {
    const buttonState: ButtonState = state === "emphasize" ? "default" : state;
    const buttonClassName = getButtonClassName({
      className: textButtonLayoutClassName,
      variant,
      state: buttonState,
    });
    return `${buttonClassName} ${className ?? ""}`.trim();
  }

  if (variant === "tertiary") {
    return `${tertiaryStateClassName[state]} ${className ?? ""}`.trim();
  }

  return `${iconOnlyBaseClassName} ${iconOnlySizeClassName[size]} ${iconOnlyStateClassName[state]} ${iconOnlyVariantClassName[variant]} ${className ?? ""}`.trim();
}

function renderIconButtonContent({
  children,
  icon,
  iconClassName,
  iconPosition = "start",
  size = "md",
  textClassName,
  variant = "ghost",
}: Pick<
  IconButtonProps,
  | "children"
  | "icon"
  | "iconClassName"
  | "iconPosition"
  | "size"
  | "textClassName"
  | "variant"
>) {
  const glyph = icon ? (
    <Icon
      name={icon}
      className={
        variant === "ghost" || variant === "outline"
          ? getIconGlyphClassName(size, iconClassName)
          : variant === "tertiary"
            ? `h-5 w-5 shrink-0 ${iconClassName ?? ""}`.trim()
            : iconClassName
      }
    />
  ) : null;

  if (variant === "tertiary") {
    const text = children ? (
      <span className={`font-semibold underline ${textClassName ?? ""}`.trim()}>
        {children}
      </span>
    ) : null;

    return iconPosition === "end" ? (
      <>
        {text}
        {glyph}
      </>
    ) : (
      <>
        {glyph}
        {text}
      </>
    );
  }

  if (variant === "primary" || variant === "secondary") {
    const text = textClassName ? (
      <span className={textClassName}>{children}</span>
    ) : (
      children
    );

    if (!glyph) return text;
    if (!text) return glyph;

    return iconPosition === "end" ? (
      <>
        {text}
        {glyph}
      </>
    ) : (
      <>
        {glyph}
        {text}
      </>
    );
  }

  return (
    <>
      {glyph}
      {children}
    </>
  );
}

export default function IconButton({
  children,
  icon,
  iconClassName,
  iconPosition = "start",
  label,
  className,
  size = "md",
  state = "default",
  textClassName,
  type = "button",
  variant = "ghost",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={getIconButtonClassName({ className, size, state, variant })}
      {...props}
      aria-label={label}
    >
      {renderIconButtonContent({
        children,
        icon,
        iconClassName,
        iconPosition,
        size,
        textClassName,
        variant,
      })}
    </button>
  );
}

export function IconButtonGlyph({
  name,
  size = "md",
  className,
}: {
  name: DPGIconName;
  size?: IconButtonSize;
  className?: string;
}) {
  return (
    <Icon name={name} className={getIconGlyphClassName(size, className)} />
  );
}
