import { Block } from "./block.js";

class App {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    const blockSize = 20;
    this.blockSize = blockSize;
    const blockSpeed = 5;
    this.blockSpeed = blockSpeed;
    this.blockList = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 2],
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ],
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, 2],
      ],
    ];
    this.colorList = ["green", "red", "orange", "blue"];

    this.dropBlocks = this.makeRandomBlocks();
    // console.log(this.dropBlocks);

    window.addEventListener("keydown", (e) => {
      console.log(e.key);
      if (e.key === "ArrowRight") {
        this.dropBlocks.forEach((block) => {
          block.x += this.blockSize;
        });
      }
      if (e.key === "ArrowLeft") {
        this.dropBlocks.forEach((block) => {
          block.x -= this.blockSize;
        });
      }
      if (e.key === " ") {
        let zeroX = this.dropBlocks[0].x;
        let zeroY = this.dropBlocks[0].y;
        this.dropBlocks.forEach((block) => {
          console.log("before :" + (block.x - zeroX) + "," + (block.y - zeroY));
          let blockZeroX = block.x - zeroX;
          let blockZeroY = block.y - zeroY;
          block.x = blockZeroY + zeroX;
          block.y = -blockZeroX + zeroY;
          console.warn("after :" + block.x + "," + block.y);
        });
      }
    });

    window.requestAnimationFrame(this.animate.bind(this));
  }

  makeRandomBlocks() {
    const ranNum = Math.floor(Math.random() * Number(this.blockList.length));
    const ranBlocks = this.blockList[ranNum];
    const blocks = [];
    ranBlocks.forEach((item) => {
      blocks.push(
        new Block(
          this.blockSize,
          this.canvas.width,
          this.canvas.height,
          this.blockSpeed,
          item[0],
          item[1],
          this.colorList[ranNum]
        )
      );
    });
    return blocks;
  }

  draw() {
    this.ctx.fillStyle = "#102330";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    let checkStopPoint;
    this.dropBlocks.forEach((block) => {
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
    this.dropBlocks.forEach((block) => {
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
