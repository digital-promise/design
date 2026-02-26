import { type DPGIconName } from "@digitalpromise/icons";
import * as SvgComponents from "@digitalpromise/icons/components";
import { type ComponentPropsWithRef } from "react";

interface IconProps extends ComponentPropsWithRef<"svg"> {
  name: DPGIconName;
}

export const Icon = ({ name, className, ...props }: IconProps) => {
  const SvgIcon = SvgComponents[name];
  return (
    <SvgIcon
      className={`inline-block align-top w-5 h-5 ${className?.trim()}`}
      {...props}
    />
  );
};

type IconButtonProps = Omit<ComponentPropsWithRef<"button">, "type"> & {
  icon: DPGIconName;
  iconClassName?: string;
  label?: string;
};

export const IconButton = ({
  label,
  className,
  icon,
  iconClassName,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-4 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ""}`}
      {...props}
      aria-label={label}
    >
      <Icon name={icon} className={iconClassName} />
    </button>
  );
};
