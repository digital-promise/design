"use client";

import { default as ReactSelect } from "react-select";
import { FormInputProps } from "./types";
import { ComponentPropsWithRef } from "react";
import { Icon } from "../icon";

type ReactSelectProps = ComponentPropsWithRef<typeof ReactSelect>;

export type SelectProps = Omit<
  ReactSelectProps,
  "unstyled" | "classNames" | "components"
> &
  FormInputProps;

export type Options = ReactSelectProps["options"];

export const Select = ({ error, id, ...userProps }: SelectProps) => {
  const defaultProps = {
    unstyled: true,
    classNames: {
      control: ({ isFocused }) => {
        const border = isFocused
          ? "border-transparent"
          : error
            ? "border-red-4"
            : "border-gray-5";
        const outline = error
          ? "outline-red-4!"
          : isFocused
            ? "outline-blue-4!"
            : undefined;

        return `border border-gray-5 rounded-sm text-base leading-5 px-[0.94rem] py-[0.69rem] ${border} ${isFocused && "outline-2!"} ${outline ?? ""}`.trim();
      },
      menu: () =>
        `bg-neutral-1 mt-[2px] mb-0 border border-gray-3 border-t-0 rounded-b-sm overflow-hidden overflow-y-auto shadow-sm`,
      option: ({ isSelected, isFocused }) => {
        const bg =
          isSelected && isFocused
            ? "bg-blue-2"
            : isSelected
              ? "bg-blue-1"
              : isFocused
                ? "bg-gray-1"
                : undefined;

        return `text-base text-gray-5 px-5 py-4 font-medium ${bg ?? ""}`.trim();
      },
    },
    components: {
      DropdownIndicator: () => <Icon name="ArrowLineDown" />,
    },
  } satisfies ReactSelectProps;

  const props = {
    ...defaultProps,
    ...userProps,
    inputId: id,
  };

  return <ReactSelect {...props} />;
};
