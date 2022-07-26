class PlayingScreen {
  constructor(map) {
    this.map = map;

    this.countdownToNextWaveText = new Text(
      { x: 20, y: 20 },
      "",
      map.tileSize / 2,
      "top",
      "left"
    );

    this.waveText = new Text(
      { x: canvas.width - 20, y: 20 },
      "",
      map.tileSize / 2,
      "top",
      "right"
    );

    this.livesText = new Text(
      { x: canvas.width - 20, y: 60 },
      "",
      map.tileSize / 2,
      "top",
      "right"
    );

    this.scoreText = new Text(
      { x: canvas.width - 20, y: 100 },
      "",
      map.tileSize / 2,
      "top",
      "right"
    );

    this.coinsText = new Text(
      { x: canvas.width - 20, y: 140 },
      "",
      map.tileSize / 2,
      "top",
      "right"
    );

    this.hoverTile = new HoverTile(
      {
        x: -1,
        y: -1,
      },
      map.tileSize
    );

    this.hasEventListeners = false;
    this.finished = false;
  }

  update() {
    this.hoverTile.update();
    this.draw();
  }

  draw() {
    this.countdownToNextWaveText.draw();
    this.waveText.draw();
    this.livesText.draw();
    this.scoreText.draw();
    this.coinsText.draw();
  }

  addEventListeners() {
    if (!this.hasEventListeners) {
      canvas.addEventListener("mousemove", (e) => {
        this.#mousemoveHandler(e);
      });
      canvas.addEventListener("click", () => {
        this.#clickHandler();
      });
      this.hasEventListeners = true;
    }
  }

  removeEventListeners() {
    if (this.hasEventListeners) {
      canvas.removeEventListener("mousemove", this.#mousemoveHandler);
      canvas.removeEventListener("click", this.#clickHandler);
      this.hasEventListeners = false;
    }
  }

  #mousemoveHandler(e) {
    this.hoverTile.position = {
      x: Math.floor(e.clientX / this.map.tileSize) * this.map.tileSize,
      y: Math.floor(e.clientY / this.map.tileSize) * this.map.tileSize,
    };
  }

  #clickHandler() {
    const tower = new Tower(
      {
        x: this.hoverTile.position.x,
        y: this.hoverTile.position.y,
      },
      this.map.tileSize,
      this.map.tileSize,
      5
    );

    if (
      this.map.canPlaceTower(this.hoverTile.currentTile) &&
      coins >= tower.cost
    ) {
      this.map.tiles[this.hoverTile.currentTile.y][
        this.hoverTile.currentTile.x
      ] = 2;
      this.map.towers.push(tower);
      coins -= tower.cost;
    }
  }
}
