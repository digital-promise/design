import { type DPGIconName } from "@digitalpromise/icons";
import * as SvgComponents from "@digitalpromise/icons/components";
import { type ComponentPropsWithRef } from "react";

export interface IconProps extends ComponentPropsWithRef<"svg"> {
  name: DPGIconName;
}

export const Icon = ({ name, className, ...props }: IconProps) => {
  const SvgIcon = SvgComponents[name];
  return (
    <SvgIcon
      className={`inline-block h-5 w-5 align-top ${className ?? ""}`.trim()}
      {...props}
    />
  );
};
