let sketch = function (p) {
    let cells = [];
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const widthNum = 40;
    const heightNum = 30;
    const cellWidth = canvasWidth / widthNum;
    const cellHeight = canvasHeight / heightNum;
  
    function generateCells(width, height) {
      for (let i = 0; i < width; i++) {
        cells[i] = [];
        for (let j = 0; j < height; j++) {
          if (Math.random() > 0.3) {
            cells[i][j] = {
              aliveNow: true,
              aliveNext: false,
              liveNeighbours: 0,
            };
          } else {
            cells[i][j] = {
              aliveNow: false,
              aliveNext: false,
              liveNeighbours: 0,
            };
          }
        }
      }
    }
  
    function cellIsAliveNextGeneration() {
      for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
          cells[i][j].liveNeighbours = 0;
  
          if (typeof cells[i - 1] != "undefined" && cells[i - 1][j].aliveNow) {
            cells[i][j].liveNeighbours++;
          }
          if (typeof cells[i + 1] != "undefined" && cells[i + 1][j].aliveNow) {
            cells[i][j].liveNeighbours++;
          }
          if (typeof cells[i][j - 1] != "undefined" && cells[i][j - 1].aliveNow) {
            cells[i][j].liveNeighbours++;
          }
          if (typeof cells[i][j + 1] != "undefined" && cells[i][j + 1].aliveNow) {
            cells[i][j].liveNeighbours++;
          }
  
          if (
            cells[i][j].liveNeighbours === 0 ||
            cells[i][j].liveNeighbours === 4
          ) {
            cells[i][j].aliveNext = false;
          } else {
            cells[i][j].aliveNext = true;
          }
        }
      }
    }
  
    function drawCells() {
      for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
          p.noStroke();
  
          if (cells[i][j].aliveNow) {
            p.fill("#FFFFFF");
            p.rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
          }
  
          if (!cells[i][j].aliveNow) {
            p.fill("#39FF14");
            p.rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
          }
        }
      }
    }
  
    function resetGeneration() {
      for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
          cells[i][j].aliveNow = cells[i][j].aliveNext;
        }
      }
    }
  
    p.setup = function () {
      p.createCanvas(canvasWidth, canvasHeight);
      p.background("grey");
      p.frameRate(5);
      generateCells(widthNum, heightNum);
    };
  
    p.draw = function () {
      if (p.mouseIsPressed) {
        cellIsAliveNextGeneration();
        drawCells();
        resetGeneration();
      }
    };
  
    p.windowResized = function () {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    };
  };
  
  let myp5 = new p5(sketch);
