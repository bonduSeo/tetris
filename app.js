import { Block } from "./block.js";

class App {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    const blockSize = 30;

    this.blocksL = [
      new Block(blockSize, this.canvas.Width, this.canvas.Height, 0, 0),
      new Block(blockSize, this.canvas.Width, this.canvas.Height, 0, 1),
      new Block(blockSize, this.canvas.Width, this.canvas.Height, 0, 2),
      new Block(blockSize, this.canvas.Width, this.canvas.Height, 1, 2),
    ];

    window.requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    this.ctx.fillStyle = "#102330";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.blocksL.forEach((block) => {
      block.draw(this.ctx);
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
