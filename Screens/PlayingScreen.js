class PlayingScreen {
  constructor(map, topbar) {
    this.map = map;
    this.topbar = topbar;

    this.countdownToNextWaveText = new Text(
      { x: this.topbar.position.x, y: 20 },
      "",
      this.map.tileSize / 3,
      "top",
      "left"
    );

    this.waveText = new Text(
      { x: this.topbar.position.x + this.topbar.width / 5, y: 20 },
      "",
      this.map.tileSize / 3,
      "top",
      "left"
    );

    this.livesText = new Text(
      { x: this.topbar.position.x + (2 * this.topbar.width) / 5, y: 20 },
      "",
      this.map.tileSize / 3,
      "top",
      "left"
    );

    this.scoreText = new Text(
      { x: this.topbar.position.x + (3 * this.topbar.width) / 5, y: 20 },
      "",
      this.map.tileSize / 3,
      "top",
      "left"
    );

    this.coinsText = new Text(
      { x: this.topbar.position.x + (4 * this.topbar.width) / 5, y: 20 },
      "",
      this.map.tileSize / 3,
      "top",
      "left"
    );

    this.hoverTile = new HoverTile(
      {
        x: -1,
        y: -1,
      },
      this.map.tileSize
    );

    this.hasEventListeners = false;
    this.finished = false;
  }

  update() {
    this.hoverTile.update();
    this.draw();
  }

  draw() {
    this.topbar.draw();
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
