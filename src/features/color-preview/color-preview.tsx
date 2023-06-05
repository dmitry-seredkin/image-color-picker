import { HTMLAttributes } from "react";

import { Link } from "../../shared/components";
import { ContentCopyIcon } from "../../shared/components/icons";
import { classnames as cn, writeToClipboard } from "../../shared/utils";

import s from "./color-preview.module.css";

interface ColorPreviewProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  color: string | null;
  fallback?: string;
}

export const ColorPreview = ({ className, color, fallback, ...props }: ColorPreviewProps) => {
  if (color == null) {
    return <p className={s.placeholder}>{fallback}</p>;
  }

  return (
    <Link onClick={() => writeToClipboard(color)}>
      <div className={cn(className, s.container)} {...props}>
        <div className={s.preview} style={{ backgroundColor: color }} />
        <p className={s.color}>{color}</p>
        <ContentCopyIcon />
      </div>
    </Link>
  );
};
