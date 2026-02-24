import { useMemo, useSyncExternalStore } from "react";

type NavigateOptions = {
  scroll?: boolean;
};

const NAV_EVENT = "dpg-next-navigation-shim:navigate";

const hasWindow = () => typeof window !== "undefined";

const subscribe = (onStoreChange: () => void) => {
  if (!hasWindow()) return () => undefined;

  const onChange = () => onStoreChange();
  window.addEventListener("popstate", onChange);
  window.addEventListener(NAV_EVENT, onChange as EventListener);

  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(NAV_EVENT, onChange as EventListener);
  };
};

const emitNavigation = () => {
  if (!hasWindow()) return;
  window.dispatchEvent(new Event(NAV_EVENT));
};

const pathnameSnapshot = () => (hasWindow() ? window.location.pathname : "/");

const searchSnapshot = () => (hasWindow() ? window.location.search : "");

export function usePathname() {
  return useSyncExternalStore(subscribe, pathnameSnapshot, () => "/");
}

export function useSearchParams() {
  const search = useSyncExternalStore(subscribe, searchSnapshot, () => "");

  return useMemo(() => new URLSearchParams(search), [search]);
}

export function useRouter() {
  return {
    push(href: string, options?: NavigateOptions) {
      if (!hasWindow()) return;

      window.history.pushState({}, "", href);
      emitNavigation();
      if (options?.scroll !== false) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    },
    replace(href: string, options?: NavigateOptions) {
      if (!hasWindow()) return;

      window.history.replaceState({}, "", href);
      emitNavigation();
      if (options?.scroll !== false) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    },
  };
}
