declare module "next/link" {
  import type {
    AnchorHTMLAttributes,
    JSX,
    PropsWithChildren,
    RefAttributes,
  } from "react";

  export type LinkProps = Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  > & {
    href: string;
    prefetch?: boolean;
    replace?: boolean;
    scroll?: boolean;
  };

  export default function Link(
    props: PropsWithChildren<LinkProps> & RefAttributes<HTMLAnchorElement>,
  ): JSX.Element;
}
