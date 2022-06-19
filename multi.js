import { Block } from "./block.js";
import { DeadBlock } from "./deadBlock.js";
import { blockList } from "./blockList.js";
import { getInfo } from "./getInfo.js";

class multiView {
  constructor() {
    this.canvas = document.querySelectorAll(".multiCanvas");
    this.ctx = this.canvas[0].getContext("2d");

    const blockSize = 20;
    this.blockSize = blockSize;

    this.dropBlocks = [];
    this.deadBlocks = [];

    window.requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    this.ctx.fillStyle = "#102330";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // this.deadBlocks.forEach((deadBlock) => {
    //   deadBlock.draw(this.ctx);
    // });
  }

  animate() {
    // getInfo();
    this.draw();
    window.requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new multiView();
};
