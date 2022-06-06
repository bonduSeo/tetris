import { Block } from "./block.js";

class App {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    const blockSize = 20;
    const blockSpeed = 5;

    // console.log(this.canvas.width);
    this.blocksL = [
      new Block(
        blockSize,
        this.canvas.width,
        this.canvas.height,
        blockSpeed,
        0,
        0
      ),
      new Block(
        blockSize,
        this.canvas.width,
        this.canvas.height,
        blockSpeed,
        0,
        1
      ),
      new Block(
        blockSize,
        this.canvas.width,
        this.canvas.height,
        blockSpeed,
        0,
        2
      ),
      new Block(
        blockSize,
        this.canvas.width,
        this.canvas.height,
        blockSpeed,
        1,
        2
      ),
    ];

    window.requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    this.ctx.fillStyle = "#102330";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    let checkStopPoint;
    this.blocksL.forEach((block) => {
      block.draw(this.ctx);
      // console.log(block.blockSize);
      if (block.y > this.canvas.height - 2 * block.blockSize) {
        checkStopPoint = true;
      }
    });
    if (checkStopPoint) {
      this.stopBlocks();
    }
  }

  stopBlocks() {
    this.blocksL.forEach((block) => {
      block.stopStatus = true;
    });
  }

  animate() {
    this.draw();
    window.requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
};
