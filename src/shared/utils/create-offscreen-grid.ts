export const createOffscreenGrid = (cellCount: number, cellSize: number): OffscreenCanvas => {
  const canvasSize = cellCount * cellSize;
  const canvas = new OffscreenCanvas(canvasSize, canvasSize);
  const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;

  if (ctx == null) throw new Error("Canvas initialization error");

  // Draw grid lines
  ctx.beginPath();
  ctx.strokeStyle = "rgb(205 205 205 / 50%)";

  for (let i = 0; i <= cellCount; i++) {
    const position = i * cellSize;

    ctx.moveTo(position, 0);
    ctx.lineTo(position, canvasSize);

    ctx.moveTo(0, position);
    ctx.lineTo(canvasSize, position);
  }

  ctx.stroke();

  // Draw central rectangle
  const position = Math.trunc(cellCount / 2);

  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.strokeStyle = "rgb(255 255 255 / 100%)";
  ctx.strokeRect(position * cellSize, position * cellSize, cellSize, cellSize);
  ctx.stroke();

  return canvas;
};
