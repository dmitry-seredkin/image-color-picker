import { HTMLAttributes } from "react";

import { Position } from "shared/models";
import { classnames as cn } from "shared/utils";

import s from "./positioned-container.module.css";

type DefaultProps = HTMLAttributes<HTMLDivElement>;

interface PositionedContainerProps extends Omit<DefaultProps, "style"> {
  position: Position | null;
}

const getContainerStyle = (position: Position | null): DefaultProps["style"] => {
  if (position == null) return { display: "none" };

  return { top: position.y, left: position.x };
};

export const PositionedContainer = ({ className, position, ...props }: PositionedContainerProps) => (
  <div {...props} className={cn(className, s.container)} style={getContainerStyle(position)} />
);
