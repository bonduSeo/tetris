import { Block } from "./block.js";
import { DeadBlock } from "./deadBlock.js";
// import { blockList } from "./blockList.js";

class multiView {
  constructor() {
    this.canvas = document.querySelectorAll(".multiCanvas");
    console.log(this.canvas[0]);
    this.ctx = this.canvas[0].getContext("2d");
    console.log(this.canvas.height);

    const blockSize = 20;
    this.blockSize = blockSize;

    this.dropBlocks = [];
    this.deadBlocks = [];

    window.requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    this.ctx.fillStyle = "#102330";
    this.ctx.fillRect(0, 0, this.canvas[0].width, this.canvas[0].height);

    this.dropBlocks.forEach((block) => {
      this.blockDraw(this.ctx, block);
    });

    this.deadBlocks.forEach((deadBlock) => {
      this.blockDraw(this.ctx, deadBlock);
    });
  }

  animate() {
    this.getInfo();
    this.draw();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  getInfo() {
    fetch("server/1.txt")
      .then((res) => {
        // console.log(res.json());
        return res.json();
      })
      .then((status) => {
        // console.log(status);
        this.dropBlocks = status[0];
        this.deadBlocks = status[1];
      });
  }

  blockDraw(ctx, block) {
    ctx.fillStyle = block.color;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.fillRect(block.x, block.y, block.blockSize, block.blockSize);
    ctx.strokeRect(block.x, block.y, block.blockSize, block.blockSize);
  }
}

window.onload = () => {
  new multiView();
};
