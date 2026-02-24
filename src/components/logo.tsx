export type LogoVariant = "black" | "white" | "color";

const variants = new Map<LogoVariant, string>([
  ["black", "/primary-badge-engine-logo-black.svg"],
  ["white", "/primary-badge-engine-logo-white.svg"],
  ["color", "/primary-badge-engine-logo-color.svg"],
]);

export default function Logo({
  variant = "color",
  className,
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  const src = variants.get(variant);

  if (src === undefined) return null;

  return (
    <img
      src={src}
      width={186}
      height={36}
      alt="Badge Engine"
      className={className}
    />
  );
}
