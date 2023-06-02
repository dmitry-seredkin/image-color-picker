import { HTMLAttributes } from 'react'

import { Button } from '../../shared/components';
import { classnames as cn, writeToClipboard } from '../../shared/utils';

import s from "./color-preview.module.css";

type Color = string;

interface ColorPreviewProps extends HTMLAttributes<HTMLDivElement> {
  color: Color;
}

export const ColorPreview = ({ className, color, ...props }: ColorPreviewProps) => (
  <div className={cn(className, s.container)} {...props}> 
    <div className={s.preview} style={{ backgroundColor: color }} />
    <div className={s.wrapper}>
      <p className={s.color}>{color}</p>
      <Button onClick={() => writeToClipboard(color)}>Copy</Button>
    </div>
  </div>
);