import type { ComponentPropsWithRef } from "react";
import { Icon } from "../icon";
import type { FormInputProps } from "./types";

interface DropzoneProps
  extends Omit<ComponentPropsWithRef<"input">, "type">,
    FormInputProps {
  instructions?: string;
}

export const Dropzone = ({
  children,
  error,
  instructions,
  className,
  ...props
}: DropzoneProps) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        data-error={error || null}
        className={`flex items-center justify-center rounded-lg border border-dashed border-blue-3 px-7 py-8 font-medium text-blue-3 data-has-image:w-max data-has-image:border-gray-3 data-is-dragging:border-blue-5 data-is-dragging:bg-blue-1 data-has-image:py-5 data-is-dragging:text-blue-4 ${className ?? ""} cursor-default`.trim()}
      >
        <input {...props} className="sr-only" type="file" />
        {children ?? (
          <p>
            <Icon name="Upload" /> Click or drop to upload
          </p>
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
  return (
    <Dropzone {...props} multiple={false} accept="image/png image/svg+xml" />
  );
};
