import { MouseEventHandler, WheelEventHandler, useEffect, useRef, useState, useLayoutEffect } from "react";

import { PositionedContainer } from "shared/components";
import { ArrowKey, Color, Dimensions, Position } from "shared/models";
import { isArrowKey } from "shared/utils";
import { ColorDropper } from "features/color-dropper";

import { BoardEngine } from "./board-engine";

import s from "./board.module.css";

type BoardCursor = "default" | "dropper";

interface BoardProps extends Dimensions {
  cursor?: BoardCursor;
  onColorSelect?: (color: Color) => void;
}

const ARROW_MOVEMENT: Record<ArrowKey, [number, number]> = {
  [ArrowKey.Up]: [0, -1],
  [ArrowKey.Right]: [1, 0],
  [ArrowKey.Down]: [0, 1],
  [ArrowKey.Left]: [-1, 0],
};
const COLOR_DROPPER_RADIUS = 10;
const SCROLL_SENSITIVITY = 0.0005;

export const Board = ({ cursor = "default", width, height, onColorSelect, ...props }: BoardProps) => {
  const engineRef = useRef<BoardEngine>(new BoardEngine());
  const dragStartRef = useRef<Position | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  const isDropperCursor = cursor === "dropper";

  const pickCursorColor = () => {
    if (!(isDropperCursor && position && onColorSelect)) return;

    const pixels = engineRef.current.getPixels(position);

    onColorSelect(pixels[0][0]);
  };

  const cleanCursorPosition: MouseEventHandler<HTMLCanvasElement> = () => {
    if (isDropperCursor) return setPosition(null);

    dragStartRef.current = null;
  };

  const updateCursorPosition: MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    setPosition({ x: offsetX, y: offsetY });
  };

  const captureDragStart: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (isDropperCursor) return;

    const { offsetX, offsetY } = event.nativeEvent;

    dragStartRef.current = { x: offsetX, y: offsetY };
  };

  const captureDrag: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (isDropperCursor) return updateCursorPosition(event);

    const { offsetX, offsetY } = event.nativeEvent;

    if (dragStartRef.current == null) return;

    engineRef.current.move(offsetX - dragStartRef.current.x, offsetY - dragStartRef.current.y);
    dragStartRef.current = { x: offsetX, y: offsetY };
  };

  const captureDragEnd: MouseEventHandler<HTMLCanvasElement> = () => {
    if (isDropperCursor) return;

    dragStartRef.current = null;
  };

  const updateZoom: WheelEventHandler<HTMLCanvasElement> = ({ deltaY }) =>
    engineRef.current.adjust(deltaY * SCROLL_SENSITIVITY);

  useLayoutEffect(() => {
    engineRef.current.resize(width, height);
  }, [width, height]);

  useEffect(() => {
    if (isDropperCursor) {
      console.debug("Use arrow keys for more precise dropper navigation!");

      const onKeyDown = (event: KeyboardEvent) => {
        if (!isArrowKey(event.code)) return;

        event.preventDefault();

        const [x, y] = ARROW_MOVEMENT[event.code];

        setPosition((prev) => {
          if (prev == null) return { x, y };

          return { x: prev.x + x, y: prev.y + y };
        });
      };

      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }
  }, [isDropperCursor]);

  useEffect(() => {
    const pasteImage = ({ clipboardData }: ClipboardEvent) => {
      if (clipboardData == null) return;

      const image = clipboardData.files.item(0);

      if (image == null) return console.debug("There is no file to paste!");

      if (!image.type.startsWith("image/")) return console.debug("You can paste image only!");

      engineRef.current.insert(image);
    };

    document.addEventListener("paste", pasteImage);
    return () => document.removeEventListener("paste", pasteImage);
  }, []);

  return (
    <div className={s.container}>
      <canvas
        {...props}
        ref={engineRef.current.initialize}
        style={{ cursor: isDropperCursor ? "none" : "default" }}
        onClick={pickCursorColor}
        onMouseDown={captureDragStart}
        onMouseLeave={cleanCursorPosition}
        onMouseMove={captureDrag}
        onMouseUp={captureDragEnd}
        onWheel={updateZoom}
      >
        This browser doesn't support the canvas element.
      </canvas>
      {isDropperCursor && (
        <PositionedContainer position={position}>
          <ColorDropper
            pixels={position ? engineRef.current.getPixels(position, COLOR_DROPPER_RADIUS) : [[]]}
            radius={COLOR_DROPPER_RADIUS}
            size={300}
          />
        </PositionedContainer>
      )}
    </div>
  );
};
