"use client";

import {
  MouseEventHandler,
  ChangeEventHandler,
  cloneElement,
  DragEventHandler,
  ReactElement,
  useRef,
  useState,
  type ComponentPropsWithRef,
} from "react";
import { Icon } from "../icon";
import type { FormInputProps } from "./types";
import Button from "../button";

interface DropzoneProps
  extends Omit<ComponentPropsWithRef<"input">, "type">,
    FormInputProps {
  instructions?: string;
  remover?: ReactElement;
}

export const Dropzone = ({
  children,
  error,
  instructions,
  className,
  ref: userRef,
  onChange: userOnChange,
  remover,
  ...props
}: DropzoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [itemPreviews, setItemPreviews] = useState<ReactElement[]>([]);
  const hasPreviews = itemPreviews.length > 0;

  const handleFileDrop: DragEventHandler = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (fileInputRef.current && e.dataTransfer.files.length > 0) {
      fileInputRef.current.files = e.dataTransfer.files;
      e.dataTransfer.clearData();
      fileInputRef.current.dispatchEvent(
        new Event("change", { bubbles: true }),
      );
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (userOnChange) userOnChange(e);

    const newPreviews = Array.from(e.currentTarget.files ?? []).map((f) => {
      if (f.type.includes("image")) {
        const src = URL.createObjectURL(f);
        return (
          <img
            key={f.name}
            alt=""
            src={src}
            className="max-h-full max-w-full object-contain"
          />
        );
      } else {
        return <p key={f.name}>{f.name}</p>;
      }
    });

    setItemPreviews(newPreviews);
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.files = null;
      fileInputRef.current.dispatchEvent(
        new Event("change", { bubbles: true }),
      );
    }
  };

  type RemoverProps = {
    onClick: MouseEventHandler;
  };

  const removerProps: RemoverProps = {
    onClick: (e) => {
      e.preventDefault();
      handleClear();
    },
  };

  const clickToClear = remover ? (
    cloneElement(remover, removerProps)
  ) : (
    <Button type="button" variant="tertiary" state="decolor" {...removerProps}>
      Remove Files
    </Button>
  );

  const handleDrag: DragEventHandler = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div>
      <label
        data-showing-preview={hasPreviews || null}
        data-is-dragging={isDragging || null}
        onDragLeave={() => setIsDragging(false)}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleFileDrop}
        htmlFor={props.id}
        data-error={error || null}
        className={`flex items-center justify-center rounded-lg border border-dashed border-blue-3 px-7 py-8 font-medium text-blue-3 data-showing-preview:w-max data-showing-preview:border-gray-3 data-showing-preview:text-gray-3 data-is-dragging:border-blue-5 data-is-dragging:bg-blue-1 data-showing-preview:py-5 data-is-dragging:text-blue-4 ${className ?? ""} cursor-default`.trim()}
      >
        <input
          {...props}
          ref={(e) => {
            if (userRef) {
              if (userRef instanceof Function) {
                userRef(e);
              } else {
                userRef.current = e;
              }
            }

            fileInputRef.current = e;
          }}
          onChange={handleChange}
          className="sr-only"
          type="file"
        />
        {hasPreviews ? (
          <>
            <aside className="grid grid-cols-2 grid-rows-2 w-11 h-11">
              {itemPreviews}
            </aside>
            {clickToClear}
          </>
        ) : (
          (children ?? (
            <p className="pointer-events-none select-none">
              <Icon name="Upload" /> Click or drop to upload
            </p>
          ))
        )}
      </label>
      {instructions && <p className="font-light leading-6">{instructions}</p>}
    </div>
  );
};

type SingleImageDropzoneProps = Omit<
  DropzoneProps,
  "multiple" | "accept" | "children"
>;

export const SingleImageDropzone = (props: SingleImageDropzoneProps) => {
  const removeImage = (
    <Button type="button" variant="tertiary" state="decolor">
      Remove Image
    </Button>
  );

  return (
    <Dropzone
      {...props}
      multiple={false}
      remover={removeImage}
      accept="image/png image/svg+xml"
    />
  );
};
