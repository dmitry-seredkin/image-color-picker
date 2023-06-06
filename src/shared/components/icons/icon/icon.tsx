import { FC, SVGProps } from "react";

import { classnames as cn } from "shared/utils";

import s from "./icon.module.css";

type IconProps = SVGProps<SVGSVGElement>;

export const Icon =
  (IconComponent: FC<IconProps>) =>
  ({ className, ...props }: IconProps) =>
    <IconComponent className={cn(className, s.icon)} {...props} />;
