"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "./icon";

type PaginationProps = {
  count: number;
  limit: number;
  pageParamKey?: string;
};

export default function Pagination({
  count,
  limit,
  pageParamKey = "page",
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const pageParam = searchParams.get(pageParamKey);
  const parsedPage = pageParam ? Number.parseInt(pageParam, 10) : Number.NaN;
  const currentPage = Number.isFinite(parsedPage) ? parsedPage : 1;
  const pages = Math.max(1, Math.ceil(count / limit));

  const paginationItems: Array<number | "ellipsis"> = (() => {
    if (pages <= 7)
      return Array.from({ length: pages }, (_value, index) => index + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "ellipsis", pages];
    if (currentPage >= pages - 3) {
      return [1, "ellipsis", pages - 4, pages - 3, pages - 2, pages - 1, pages];
    }

    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      pages,
    ];
  })();

  const onFirstPage = currentPage === 1;
  const onLastPage = currentPage === pages;

  const advancePage = (direction: "prev" | "next") => {
    if (
      (onFirstPage && direction === "prev") ||
      (onLastPage && direction === "next")
    ) {
      return;
    }

    const nextPage = direction === "prev" ? currentPage - 1 : currentPage + 1;
    const params = new URLSearchParams(searchParams.toString());
    params.set(pageParamKey, String(nextPage));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(pageParamKey, String(page));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <ul className="flex items-center justify-center gap-4 font-medium">
      <li className="mr-2">
        <button
          type="button"
          aria-label="Previous page"
          disabled={onFirstPage}
          className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[4px] bg-transparent p-[9px] text-gray-5 transition hover:bg-transparent hover:text-neutral-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-4 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => advancePage("prev")}
        >
          <Icon name="ArrowLineLeft" />
        </button>
      </li>

      {paginationItems.map((item, index) => {
        const isEllipsis = item === "ellipsis";
        const pageNumber = isEllipsis ? undefined : item;
        const isCurrentPage = pageNumber === currentPage;

        const isDisabled = isEllipsis || isCurrentPage;
        const label = isEllipsis
          ? "Pagination ellipsis"
          : `Go to page ${pageNumber}`;

        return (
          <li key={`${item}-${index}`}>
            <button
              type="button"
              aria-label={label}
              aria-current={isCurrentPage ? "page" : undefined}
              disabled={isDisabled}
              className={`flex h-[36px] w-[36px] items-center justify-center rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-4 ${
                isCurrentPage ? "bg-blue-1 text-blue-4" : ""
              } ${isDisabled ? "cursor-default" : "cursor-pointer hover:bg-gray-1"}`.trim()}
              onClick={
                !isDisabled && pageNumber
                  ? () => goToPage(pageNumber)
                  : undefined
              }
            >
              {isEllipsis ? "..." : pageNumber}
            </button>
          </li>
        );
      })}

      <li className="ml-2">
        <button
          type="button"
          aria-label="Next page"
          disabled={onLastPage}
          className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[4px] bg-transparent p-[9px] text-gray-5 transition hover:bg-transparent hover:text-neutral-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-4 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => advancePage("next")}
        >
          <Icon name="ArrowLineRight" />
        </button>
      </li>
    </ul>
  );
}
