export class Block {
  constructor(blockSize, canvasWidth, canvasHeight, speed) {
    this.x = 0;
    this.y = 0;

    this.blockSize = blockSize;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.vy = speed;
    this.color = "red";
    this.count = 0;
  }

  draw(ctx) {
    console.log(this.count++);
    if (this.count == 60 / this.vy) {
      this.y += this.blockSize;
      this.count = 0;
    }

    ctx.fillStyle = this.color;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.blockSize, this.blockSize);
    ctx.strokeRect(this.x, this.y, this.blockSize, this.blockSize);
  }
}
