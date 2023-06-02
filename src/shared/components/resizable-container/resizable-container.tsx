import { ReactNode, useEffect, useRef, useState } from "react";

interface ContainerDimensions {
  width: number;
  height: number;
}

interface ResizableContainerProps {
  children: (dimensions: ContainerDimensions) => ReactNode;
}

export const ResizableContainer = ({ children }: ResizableContainerProps) => {
  const [dimensions, setDimensions] = useState<ContainerDimensions | null>(null);
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
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {dimensions && children(dimensions)}
    </div>
  );
};
