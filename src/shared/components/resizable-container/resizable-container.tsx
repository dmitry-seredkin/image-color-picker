import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";

import { Dimensions } from "shared/models";
import { classnames as cn } from "shared/utils";

import s from "./resizable-container.module.css";

type DefaultProps = HTMLAttributes<HTMLDivElement>;

interface ResizableContainerProps extends Omit<DefaultProps, "children"> {
  children: (dimensions: Dimensions) => ReactNode;
}

export const ResizableContainer = ({ className, children, ...props }: ResizableContainerProps) => {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current: container } = containerRef;

    if (container) {
      const calculateDimensions = () => {
        const { offsetWidth, offsetHeight } = container;

        setDimensions({ width: offsetWidth, height: offsetHeight });
      };

      calculateDimensions(); // Dimensions initialization

      window.addEventListener("resize", calculateDimensions);
      return () => window.removeEventListener("resize", calculateDimensions);
    }
  }, []);

  return (
    <div {...props} ref={containerRef} className={cn(className, s.container)}>
      {dimensions && children(dimensions)}
    </div>
  );
};
