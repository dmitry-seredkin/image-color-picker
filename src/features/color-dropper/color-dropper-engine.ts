import { Pixels } from "shared/models";
import { CanvasEngine } from "shared/services";
import { createOffscreenGrid, getNaturalNumber } from "shared/utils";

export interface ColorDropperCellConfig {
  count: number;
  size: number;
}

export class ColorDropperEngine extends CanvasEngine {
  private cell: ColorDropperCellConfig;
  private grid: OffscreenCanvas;

  constructor(dropperRadius: number, dropperSize: number) {
    super();

    const count = 2 * getNaturalNumber(dropperRadius) + 1;
    const size = getNaturalNumber(dropperSize / count);

    this.cell = { count, size };
    this.grid = createOffscreenGrid(count, size);
  }

  public initialize = (canvas: HTMLCanvasElement | null) => {
    const ctx = canvas?.getContext("2d");

    if (ctx != null) {
      const size = this.cell.count * this.cell.size;

      this.ctx = ctx;
      this.resize(size, size);
    }
  };

  public draw = (pixels: Pixels) => {
    const { size } = this.cell;

    // Clear previous pixels
    this.clear();

    // Draw image pixels
    pixels.forEach((rows, indexY) =>
      rows.forEach((color, indexX) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(indexX * size, indexY * size, size, size);
      })
    );

    // Draw prepared grid
    this.ctx.drawImage(this.grid, 0, 0, this.grid.width, this.grid.height);
  };
}
