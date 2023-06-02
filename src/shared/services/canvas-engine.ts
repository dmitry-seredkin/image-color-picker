export abstract class CanvasEngine {
  protected ctx!: CanvasRenderingContext2D;

  public clear = () => this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

  public resize = (width: number, height: number) => {
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
  };

  public abstract initialize(canvas: HTMLCanvasElement): void;
}
