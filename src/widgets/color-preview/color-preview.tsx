import { HTMLAttributes } from "react";

import { ContentCopyIcon } from "../../shared/components/icons";
import { classnames as cn } from "../../shared/utils";

import s from "./color-preview.module.css";

interface ColorPreviewProps extends HTMLAttributes<HTMLDivElement> {
  color: string;
}

export const ColorPreview = ({ className, color, ...props }: ColorPreviewProps) => (
  <div className={cn(className, s.container)} {...props}>
    <div className={s.preview} style={{ backgroundColor: color }} />
    <p className={s.color}>{color}</p>
    <ContentCopyIcon />
  </div>
);
