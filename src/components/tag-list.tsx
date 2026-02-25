export const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <ul className="flex gap-2">
      {tags
        .filter(Boolean)
        .map((t, i) => (
          <li
            key={i}
            className="rounded-sm bg-gray-1 px-4 py-2 font-medium text-neutral-5"
          >
            {t}
          </li>
        ))}
    </ul>
  );
};
