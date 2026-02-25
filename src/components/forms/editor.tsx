"use client";

import { useState, type ComponentPropsWithRef } from "react";
import type { FormInputProps } from "./types";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  defaultSvgIcons,
  headingsPlugin,
  type IconKey,
  inFocus$,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  realmPlugin,
  type RealmPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { Icon } from "../icon";

type EditorProps = Omit<ComponentPropsWithRef<typeof MDXEditor>, "markdown"> &
  FormInputProps & {
    defaultValue?: string;
  };

const resolveToolbarIcon = (name: IconKey) => {
  switch (name) {
    case "format_bold":
      return <Icon name="text-bold" />;
    case "format_italic":
      return <Icon name="text-italic" />;
    case "format_underlined":
      return <Icon name="text-underline" />;
    case "format_list_bulleted":
      return <Icon name="list" />;
    case "format_list_numbered":
      return <Icon name="list-number" />;
    case "link":
      return <Icon name="link" />;
    default:
      return defaultSvgIcons[name];
  }
};

const toolbarContents = () => (
  <div className="flex items-center divide-x divide-gray-2">
    <div className="flex pr-2">
      <BoldItalicUnderlineToggles options={["Bold"]} />
      <BoldItalicUnderlineToggles options={["Italic"]} />
      <BoldItalicUnderlineToggles options={["Underline"]} />
    </div>

    <div className="px-2">
      <CreateLink />
    </div>

    <div className="px-2">
      <ListsToggle options={["bullet", "number"]} />
    </div>

    <div className="pl-2">
      <BlockTypeSelect />
    </div>
  </div>
);

const plugins: RealmPlugin[] = [
  headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
  listsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  thematicBreakPlugin(),
  markdownShortcutPlugin(),
  toolbarPlugin({ toolbarContents }),
];

export const Editor = ({ error, defaultValue, ...props }: EditorProps) => {
  const [inFocus, setInFocus] = useState(false);
  return (
    <div
      data-focus={inFocus || null}
      data-error={error || null}
      className="border border-gray-5 rounded-sm data-error:border-red-4 data-focus:border-2 data-focus:border-blue-4 data-error:data-focus:border-red-4 box-content"
    >
      <MDXEditor
        {...props}
        markdown={defaultValue ?? ""}
        contentEditableClassName="prose min-h-[252px] min-w-[722px]"
        iconComponentFor={resolveToolbarIcon}
        plugins={[
          ...plugins,
          realmPlugin({
            init(r) {
              r.sub(inFocus$, setInFocus);
            },
          })(),
        ]}
      />
    </div>
  );
};
