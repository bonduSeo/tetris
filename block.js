export class Block {
  constructor(blockSize, canvasWidth, canvasHeight, speed, x, y) {
    this.x = canvasWidth / 2 + x * blockSize - blockSize;
    this.y = y * blockSize;

    this.blockSize = blockSize;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.vy = speed;
    this.color = "red";
    this.count = 0;
    this.stopStatus = false;
  }

  draw(ctx) {
    // console.log(this.count++);

    if (!this.stopStatus && this.count++ == 60 / this.vy) {
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
