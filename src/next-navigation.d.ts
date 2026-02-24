declare module "next/navigation" {
  export type NavigateOptions = {
    scroll?: boolean;
  };

  export interface AppRouterInstance {
    push(href: string, options?: NavigateOptions): void;
    replace(href: string, options?: NavigateOptions): void;
  }

  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
  export function useRouter(): AppRouterInstance;
}
