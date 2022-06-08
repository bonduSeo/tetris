import { Block } from "./block.js";
import { DeadBlock } from "./deadblock.js";

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
        [0, -1],
        [0, 0],
        [0, 1],
        [1, 1],
      ],
      [
        [0, -2],
        [0, -1],
        [0, 0],
        [0, 1],
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
    let spaceStatus = true;
    // console.log(this.dropBlocks);

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        console.log(this.checkSideBlock("right"));
        if (this.checkSideBlock("right")) {
          this.dropBlocks.forEach((block) => {
            block.x += this.blockSize;
          });
        }
      }
      if (e.key === "ArrowLeft") {
        this.dropBlocks.forEach((block) => {
          if (this.checkSideBlock("left")) {
            block.x -= this.blockSize;
          }
        });
      }
      if (e.key === "ArrowUp") {
        let zeroX = this.dropBlocks[2].x;
        let zeroY = this.dropBlocks[2].y;
        this.dropBlocks.forEach((block) => {
          console.log("before :" + (block.x - zeroX) + "," + (block.y - zeroY));
          let blockZeroX = block.x - zeroX;
          let blockZeroY = block.y - zeroY;
          block.x = blockZeroY + zeroX;
          block.y = -blockZeroX + zeroY;
          console.warn("after :" + block.x + "," + block.y);
        });
      }
      if (e.key === " ") {
        console.log("aa");
        while (spaceStatus) {
          this.dropBlocks.forEach((block) => {
            block.y += this.blockSize;
          });
        }
      }
    });

    this.deadBlocks = this.makeGroundBlock();
    console.log(this.deadBlocks);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  makeRandomBlocks() {
    const ranNum = Math.floor(Math.random() * Number(this.blockList.length));
    const ranBlocks = this.blockList[ranNum];
    const blocks = [];
    ranBlocks.forEach((item) => {
      blocks.push(new Block(this.blockSize, this.canvas.width, this.canvas.height, this.blockSpeed, item[0], item[1], this.colorList[ranNum]));
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
      this.deadBlocks.forEach((deadBlock) => {
        if (block.x == deadBlock.x && block.y == deadBlock.y - this.blockSize) {
          checkStopPoint = true;
        }
        if (deadBlock.y <= 0) {
          this.deadBlocks = this.makeGroundBlock();
        }
      });
    });
    if (checkStopPoint) {
      this.stopBlocks();
    }

    this.deadBlocks.forEach((deadBlock) => {
      deadBlock.draw(this.ctx);
    });
  }

  stopBlocks() {
    spaceStatus = false;
    this.dropBlocks.forEach((dropBlock) => {
      this.deadBlocks.push(new DeadBlock(dropBlock));
    });
    this.dropBlocks = [];
    this.dropBlocks = this.makeRandomBlocks();
  }

  animate() {
    this.draw();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  checkSideBlock(direction) {
    for (let i = 0; i < this.dropBlocks.length; i++) {
      for (let j = 0; j < this.deadBlocks.length; j++) {
        if (direction == "right") {
          if (this.dropBlocks[i].y == this.deadBlocks[j].y && this.dropBlocks[i].x + this.blockSize == this.deadBlocks[j].x) {
            return false;
          }
        }
        if (direction == "left") {
          if (this.dropBlocks[i].y == this.deadBlocks[j].y && this.dropBlocks[i].x - this.blockSize == this.deadBlocks[j].x) {
            return false;
          }
        }
      }
    }
    return true;
  }

  makeGroundBlock() {
    const groundBlocks = [];
    for (let i = 0; i < this.canvas.width; i += this.blockSize) {
      const beforeGroundBlk = {
        x: i,
        y: this.canvas.height - this.blockSize,
        blockSize: this.blockSize,
        color: "gray",
      };
      const groundBlock = new DeadBlock(beforeGroundBlk);
      groundBlocks.push(groundBlock);
    }
    return groundBlocks;
  }
}

window.onload = () => {
  new App();
};
