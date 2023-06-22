import { Dimensions, Pixels, Position } from "shared/models";
import { CanvasEngine } from "shared/services";
import { convertRgbToHex, createImageElement } from "shared/utils";

const applyZoomToImage = (image: Dimensions, zoom: number): Dimensions => ({
  width: image.width * zoom,
  height: image.height * zoom,
});

const findImagePositionOnCanvas = (image: Dimensions, canvas: Dimensions): Position => ({
  x: (canvas.width - image.width) / 2,
  y: (canvas.height - image.height) / 2,
});

const INITIAL_OFFSET: Position = { x: 0, y: 0 };
const INITIAL_ZOOM = 1;
const MAX_ZOOM = 2;
const MIN_ZOOM = 0.25;

export class BoardEngine extends CanvasEngine {
  image: HTMLImageElement | null = null;
  offset = INITIAL_OFFSET;
  zoom = INITIAL_ZOOM;

  private draw = () => {
    if (this.image == null) return;

    this.clear();

    const dimensions = applyZoomToImage(this.image, this.zoom);
    const position = findImagePositionOnCanvas(dimensions, this.ctx.canvas);

    this.ctx.drawImage(
      this.image,
      position.x + this.offset.x,
      position.y + this.offset.y,
      dimensions.width,
      dimensions.height
    );
  };

  public initialize = (canvas: HTMLCanvasElement | null) => {
    const ctx = canvas?.getContext("2d");

    if (ctx != null) this.ctx = ctx;
  };

  public adjust = (delta: number) => {
    const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, this.zoom + delta));

    if (newZoom !== this.zoom) {
      this.zoom = newZoom;

      this.draw();
    }
  };

  public insert = async (image: Blob) => {
    try {
      this.image = await createImageElement(image);

      this.reset();
      this.draw();
    } catch (error) {
      console.error(error);
    }
  };

  public move = (deltaX: number, deltaY: number) => {
    if (deltaX === 0 && deltaY === 0) return;

    this.offset = { x: this.offset.x + deltaX, y: this.offset.y + deltaY };
    this.draw();
  };

  public reset = () => {
    this.offset = INITIAL_OFFSET;
    this.zoom = INITIAL_ZOOM;
  };

  public resize(width: number, height: number) {
    super.resize(width, height);

    this.draw();
  }

  public getPixels = (position: Position, radius = 0): Pixels => {
    const pixelGridSize = 2 * radius + 1;
    const pixels = [];

    for (let y = 0; y < pixelGridSize; y++) {
      const sy = position.y - radius + y;
      const row = [];

      for (let x = 0; x < pixelGridSize; x++) {
        const sx = position.x - radius + x;
        const { data } = this.ctx.getImageData(sx, sy, 1, 1);

        row.push(convertRgbToHex(...data));
      }
      pixels.push(row);
    }
    return pixels;
  };
}
