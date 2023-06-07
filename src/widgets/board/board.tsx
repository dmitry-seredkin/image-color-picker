import {
  MouseEvent,
  MouseEventHandler,
  WheelEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { throttle } from "lodash";

import { ColorDropper } from "features/color-dropper";
import { PositionedContainer } from "shared/components";
import { ArrowKey, Color, Dimensions, Position } from "shared/models";
import { isArrowKey } from "shared/utils";

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

const getEventPosition = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>): Position => {
  const { offsetX, offsetY } = nativeEvent;

  return { x: offsetX, y: offsetY };
};

export const Board = ({ cursor = "default", width, height, onColorSelect, ...props }: BoardProps) => {
  const engineRef = useRef<BoardEngine>(new BoardEngine());
  const dragStartRef = useRef<Position | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  const isDropperCursor = cursor === "dropper";

  const selectCursorColor = () => {
    if (!(isDropperCursor && position && onColorSelect)) return;

    const pixels = engineRef.current.getPixels(position);

    onColorSelect(pixels[0][0]);
  };

  const clearCursorPosition: MouseEventHandler<HTMLCanvasElement> = () => {
    if (isDropperCursor) return setPosition(null);

    dragStartRef.current = null;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateCursorPosition: MouseEventHandler<HTMLCanvasElement> = useCallback(
    throttle((event) => setPosition(getEventPosition(event)), 16),
    []
  );

  const captureDragStart: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (isDropperCursor) return;

    dragStartRef.current = getEventPosition(event);
  };

  const captureDrag: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (isDropperCursor) return updateCursorPosition(event);
    if (dragStartRef.current == null) return;

    const start = dragStartRef.current;
    const end = getEventPosition(event);

    engineRef.current.move(end.x - start.x, end.y - start.y);
    dragStartRef.current = end;
  };

  const captureDragEnd: MouseEventHandler<HTMLCanvasElement> = () => {
    if (isDropperCursor) return;

    dragStartRef.current = null;
  };

  const updateZoom: WheelEventHandler<HTMLCanvasElement> = ({ deltaY }) => {
    if (isDropperCursor) return;

    engineRef.current.adjust(deltaY * SCROLL_SENSITIVITY);
  };

  useLayoutEffect(() => {
    engineRef.current.resize(width, height);
  }, [width, height]);

  useEffect(() => {
    if (isDropperCursor) {
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

      if (image == null || !image.type.startsWith("image/")) return;

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
        onClick={selectCursorColor}
        onMouseDown={captureDragStart}
        onMouseLeave={clearCursorPosition}
        onMouseMove={captureDrag}
        onMouseUp={captureDragEnd}
        onWheel={updateZoom}
      >
        This browser doesn't support the canvas element.
      </canvas>
      {isDropperCursor && position && (
        <PositionedContainer position={position}>
          <ColorDropper
            pixels={engineRef.current.getPixels(position, COLOR_DROPPER_RADIUS)}
            radius={COLOR_DROPPER_RADIUS}
            size={300}
          />
        </PositionedContainer>
      )}
    </div>
  );
};
