import { useLayoutEffect, useRef } from "react";

import { ColorDropperEngine } from "./color-dropper-engine";
import { Pixels } from "../../shared/models";

import s from "./color-dropper.module.css";

interface ColorDropperProps {
  pixels: Pixels;
  radius: number;
  size?: number;
}

const COLOR_DROPPER_SIZE = 200;
const HEX_COLOR_CHAR_COUNT = 6;

export const ColorDropper = ({ pixels, radius, size = COLOR_DROPPER_SIZE }: ColorDropperProps) => {
  const engineRef = useRef<ColorDropperEngine>(new ColorDropperEngine(radius, size));

  const middleIndex = Math.trunc(pixels.length / 2);
  const selectedColor = pixels.at(middleIndex)?.at(middleIndex);

  useLayoutEffect(() => {
    engineRef.current.draw(pixels);
  }, [pixels]);

  return (
    <div className={s.container} style={{ borderColor: selectedColor }}>
      <canvas ref={engineRef.current.initialize} className={s.dropper}>
        This browser doesn't support the canvas element.
      </canvas>
      <div className={s.preview}>{selectedColor?.slice(0, HEX_COLOR_CHAR_COUNT + 1)}</div>
    </div>
  );
};
