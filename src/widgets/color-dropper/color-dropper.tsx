import { useLayoutEffect, useRef } from "react";

import s from "./color-dropper.module.css";

class ColorDropperEngine {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  draw = (colors: string[][]) => {
    if (this.ctx == null) return;

    const side = this.size / colors.length;

    colors.forEach((rows, indexY) => rows.forEach((color, indexX) => {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(indexX * side, indexY * side, side, side);
    }))

    this.drawGrid(colors.length);
  }

  drawGrid = (count: number) => {
    const side = this.size / count;

    for (let i = 0; i <= count; i++) {
      const position = i * side;

      this.ctx.moveTo(position, 0);
      this.ctx.lineTo(position, this.size);

      this.ctx.moveTo(0, position);
      this.ctx.lineTo(this.size, position);
    }

    this.ctx.strokeStyle = "rgb(205 205 205 / 50%)";
    this.ctx.stroke();
  }

  setCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d"); 

    if (ctx == null) throw new Error("This.ctx isn't defined");
    
    this.canvas = canvas;
    this.ctx = ctx;
  }
}

interface ColorDropperPosition {
  x: number;
  y: number;
}

interface ColorDropperProps {
  colors: string[][];
  position: ColorDropperPosition;
  size?: number;
}

export const ColorDropper = ({ colors, position, size = 200 }: ColorDropperProps) => {
  const engineRef = useRef<ColorDropperEngine>(new ColorDropperEngine(size));

  const index = Math.trunc(colors.length / 2);
  const offset = size / 2;

  useLayoutEffect(() => {
    const { current: engine } = engineRef;
  
    engine.draw(colors);
  }, [colors])
  

  return (<div className={s.container} style={{ top: position.y - offset, left: position.x - offset }}>
    <canvas ref={engineRef.current.setCanvas} className={s.dropper} width={size} height={size} style={{ borderColor: colors[index][index] }}>
      Some
    </canvas>
  </div>)
  
}