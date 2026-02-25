"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchProps = {
  placeholder: string;
  className?: string;
  inputWidth?: number | string;
  value?: string;
  onChange?: (value: string) => void;
  syncToUrl?: boolean;
  id?: string;
  paramKey?: string;
};

export default function Search({
  placeholder,
  className,
  inputWidth,
  value,
  onChange,
  syncToUrl = true,
  id = "search",
  paramKey = "s",
}: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const isControlled = value !== undefined;
  const [query, setQuery] = useState(
    isControlled ? value : searchParams.get(paramKey)?.toString() ?? "",
  );

  const effectiveQuery = isControlled ? value : query;
  const placeholderLength = Math.max(placeholder.length, 1);
  const compactWidth = `calc(${placeholderLength}ch + 60px)`;
  const resolvedWidth =
    inputWidth === undefined
      ? compactWidth
      : typeof inputWidth === "number"
        ? `${inputWidth}px`
        : inputWidth;

  useEffect(() => {
    if (!syncToUrl || isControlled) return;
    setQuery(searchParams.get(paramKey)?.toString() ?? "");
  }, [isControlled, paramKey, searchParams, syncToUrl]);

  const updateSearch = (nextQuery: string): void => {
    if (!syncToUrl) return;

    const params = new URLSearchParams(searchParams.toString());
    if (nextQuery) {
      params.set(paramKey, nextQuery);
      params.delete("page");
    } else {
      params.delete(paramKey);
      params.delete("page");
    }

    const serialized = params.toString();
    router.replace(serialized ? `${pathname}?${serialized}` : pathname);
  };

  return (
    <form className={className ?? ""} noValidate>
      <label className="sr-only" htmlFor={id}>
        Search
      </label>
      <div className="relative max-w-full" style={{ width: resolvedWidth }}>
        <span
          aria-hidden
          className="absolute left-[15px] top-1/2 z-10 -translate-y-1/2 font-icon dpg-icons-magnifier inline-block h-6 w-6 text-[24px] leading-[24px] text-gray-5"
        />
        <input
          ref={inputRef}
          className="hide-search-clear block w-full max-w-full rounded-[4px] bg-white py-[11px] pl-[15px] pr-[40px] text-base leading-6 indent-[30px] outline outline-1 outline-gray-5 transition focus:outline-2 focus:outline-blue-4"
          style={{
            color: "#000000",
            WebkitTextFillColor: "#000000",
          }}
          size={placeholderLength}
          id={id}
          type="search"
          autoComplete="off"
          value={effectiveQuery}
          placeholder={placeholder}
          onChange={(event) => {
            const nextValue = event.target.value;
            if (!isControlled) setQuery(nextValue);
            onChange?.(nextValue);
            updateSearch(nextValue);
          }}
        />

        {effectiveQuery.length > 0 && (
          <button
            type="button"
            aria-label="Clear search"
            className="absolute right-[4px] top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg p-2 text-gray-5 hover:text-neutral-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-4"
            onClick={() => {
              if (!isControlled) setQuery("");
              onChange?.("");
              updateSearch("");
              inputRef.current?.focus();
            }}
          >
            <span
              aria-hidden
              className="font-icon dpg-icons-close inline-block h-4 w-4 text-[16px] leading-[16px] text-gray-5"
            />
          </button>
        )}
      </div>
    </form>
  );
}
