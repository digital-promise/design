import type { DPGIconId } from "@digitalpromise/icons/dist/dpg-icons";
import {
  type ComponentPropsWithRef,
  FC,
  SVGProps,
  useEffect,
  useRef,
  useState,
} from "react";

interface IconProps extends ComponentPropsWithRef<"svg"> {
  name: DPGIconId;
}

type InlineSVG = FC<SVGProps<SVGElement>>;

const useImportedSvg = (name: DPGIconId) => {
  const svgRef = useRef<InlineSVG>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const importSvgModule = async () => {
      try {
        const importedSvg = await import(
          `@digitalpromise/icons/dist/icons/${name}.svg`
        );
        svgRef.current = importedSvg.default as InlineSVG;
      } catch (importError) {
        setError(importError as Error);
      } finally {
        setIsLoading(false);
      }
    };
    importSvgModule();
  }, [name]);

  return {
    Svg: svgRef.current,
    error,
    isLoading,
  };
};

export const Icon = ({ name, className, ...props }: IconProps) => {
  const { Svg, isLoading, error } = useImportedSvg(name);

  if (error) {
    console.log(error);

    return (
      <i className="inline-block align-top w-5 h-5 text-gray-4 not-italic border-gray-5 rounded-full">
        !
      </i>
    );
  }

  if (isLoading) {
    return <i className="inline-block align-top w-5 h-5"></i>;
  }

  if (Svg) {
    return (
      <Svg
        className={`inline-block align-top ${className ?? ""}`.trim()}
        {...props}
      />
    );
  }

  return null;
};

type IconButtonProps = Omit<ComponentPropsWithRef<"button">, "type"> & {
  icon: DPGIconId;
  iconClassName?: string;
  label?: string;
};

export const IconButton = ({
  label,
  className,
  icon,
  iconClassName,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-4 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ""}`}
      {...props}
      aria-label={label}
    >
      <Icon name={icon} className={iconClassName} />
    </button>
  );
};
