"use client";

import { useRef, useState } from "react";
import { TextInput } from "./text-input";
import Button from "../button";
import { Icon } from "../icon";
import type { FormInputProps } from "./types";

type ListInputProps = FormInputProps & {
  onChange?: (list: string[]) => void;
  defaultValue?: string[];
};

export const ListInput = ({ onChange, defaultValue }: ListInputProps) => {
  const [items, setItems] = useState(new Set(defaultValue));
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = (items: Set<string>) => {
    if (onChange) onChange(Array.from(items));
    setItems(new Set(items));
  };

  const addItems = () => {
    if (inputRef.current) {
      const values = inputRef.current.value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      values.forEach((v) => items.add(v));
      inputRef.current.value = "";
      handleUpdate(items);
    }
  };

  const removeItem = (item: string) => {
    if (items.delete(item)) {
      handleUpdate(items);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <TextInput
          ref={inputRef}
          className="basis-[38rem] placeholder:text-gray-5"
          placeholder="Enter tags separated with a comma"
          onChange={(e) => e.stopPropagation()}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItems();
            }
          }}
        />

        <Button variant="tertiary" type="button" onClick={() => addItems()}>
          <Icon name="Plus" />
          <span className="grow underline">Add Tag</span>
        </Button>
      </div>
      <ul className="flex flex-wrap gap-2">
        {[...items].map((i) => (
          <li
            key={i}
            className="flex gap-3 rounded-sm bg-gray-1 px-4 py-2 font-medium"
          >
            {i}{" "}
            <button
              onClick={() => removeItem(i)}
              className="be-btn-24 inline-flex items-center justify-center rounded font-bold leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-4"
              type="button"
            >
              <Icon name="Close" />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
