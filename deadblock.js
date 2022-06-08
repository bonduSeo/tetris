export class DeadBlock {
  constructor(dropBlock) {
    this.x = dropBlock.x;
    this.y = dropBlock.y;
    this.blockSize = dropBlock.blockSize;
    this.color = dropBlock.color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.blockSize, this.blockSize);
    ctx.strokeRect(this.x, this.y, this.blockSize, this.blockSize);
  }
}
