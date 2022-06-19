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

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        if (this.checkSideBlock("right")) {
          this.dropBlocks.forEach((block) => {
            block.x += this.blockSize;
          });
        }
      }
      if (e.key === "ArrowLeft") {
        if (this.checkSideBlock("left")) {
          this.dropBlocks.forEach((block) => {
            block.x -= this.blockSize;
          });
        }
      }
      if (e.key === "ArrowUp") {
        let zeroX = this.dropBlocks[2].x;
        let zeroY = this.dropBlocks[2].y;

        this.dropBlocks.forEach((block) => {
          let blockZeroX = block.x - zeroX;
          let blockZeroY = block.y - zeroY;
          block.x = blockZeroY + zeroX;
          block.y = -blockZeroX + zeroY;
        });
      }
      if (e.key === "ArrowDown") {
        this.downBlocksOneStep();
      }
      if (e.key === " ") {
        let dropBlockHeight = {};
        this.dropBlocks.forEach((block) => {
          if (typeof dropBlockHeight[block.x] == "undefined") {
            dropBlockHeight[block.x] = block.y;
          } else {
            dropBlockHeight[block.x] = dropBlockHeight[block.x] > block.y ? dropBlockHeight[block.x] : block.y;
          }
        });

        let deadBlockHeight = {};
        this.deadBlocks.forEach((deadBlock) => {
          Object.keys(dropBlockHeight).forEach((keyX) => {
            if (deadBlock.x == keyX) {
              if (typeof deadBlockHeight[deadBlock.x] == "undefined") {
                deadBlockHeight[deadBlock.x] = deadBlock.y;
              } else {
                deadBlockHeight[deadBlock.x] = deadBlockHeight[deadBlock.x] < deadBlock.y ? deadBlockHeight[deadBlock.x] : deadBlock.y;
              }
            }
          });
        });

        const heightDiff = [];
        Object.keys(dropBlockHeight).forEach((key) => {
          const diff = deadBlockHeight[key] - dropBlockHeight[key];
          heightDiff.push(diff);
        });
        const minValue = Math.min(...heightDiff);

        this.dropBlocks.forEach((block) => {
          block.y += minValue - this.blockSize;
        });
        this.stopBlocks();
      }
    });

    this.deadBlocks = this.makeGroundBlock();

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
          //게임리셋
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

  animate() {
    this.draw();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  stopBlocks() {
    this.dropBlocks.forEach((dropBlock) => {
      this.deadBlocks.push(new DeadBlock(dropBlock));
    });

    this.checkStrike();
    this.dropBlocks = this.makeRandomBlocks();
  }

  checkStrike() {
    //여기 해야함
    const lineCheck = [];
    this.deadBlocks.forEach((block) => {
      const key = (this.canvas.height - this.blockSize - block.y) / this.blockSize;
      if (typeof lineCheck[key] == "undefined") {
        lineCheck[key] = [];
      }
      lineCheck[key].push(block);
    });

    const delYArray = [];
    for (let i = 0; i < lineCheck.length; i++) {
      if (lineCheck[i].length >= this.canvas.width / this.blockSize) {
        const delY = this.canvas.height - this.blockSize - i * this.blockSize;
        delYArray.push(delY);
      }
    }
    const newDeadBlocks = this.makeGroundBlock();

    this.deadBlocks.forEach((block) => {
      let checkDelBlock = true;
      let checkBlockDown = 0;
      //false면 블럭삭제
      delYArray.forEach((delY) => {
        if (block.y == delY) {
          checkDelBlock = false;
        } else if (block.y < delY) {
          checkBlockDown += this.blockSize;
        }
      });

      if (checkDelBlock) {
        block.y += checkBlockDown;
        newDeadBlocks.push(block);
      }
    });

    this.deadBlocks = newDeadBlocks;
  }

  checkSideBlock(direction) {
    for (let i = 0; i < this.dropBlocks.length; i++) {
      for (let j = 0; j < this.deadBlocks.length; j++) {
        if (direction == "right") {
          if (
            this.dropBlocks[i].x >= this.canvas.width - this.blockSize ||
            (this.dropBlocks[i].y == this.deadBlocks[j].y && this.dropBlocks[i].x + this.blockSize == this.deadBlocks[j].x)
          ) {
            return false;
          }
        }
        if (direction == "left") {
          if (
            this.dropBlocks[i].x <= 0 ||
            (this.dropBlocks[i].y == this.deadBlocks[j].y && this.dropBlocks[i].x - this.blockSize == this.deadBlocks[j].x)
          ) {
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
        y: this.canvas.height,
        blockSize: this.blockSize,
        color: "gray",
      };
      const groundBlock = new DeadBlock(beforeGroundBlk);
      groundBlocks.push(groundBlock);
    }
    return groundBlocks;
  }

  downBlocksOneStep() {
    this.dropBlocks.forEach((block) => {
      block.y += this.blockSize;
    });
  }
}

window.onload = () => {
  new App();
};
