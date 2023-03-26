class PlayingScreen {
  constructor(map, sidebar) {
    this.map = map;
    this.sidebar = sidebar;

    this.countdownToNextWaveText = new Text(
      { x: this.sidebar.position.x + this.sidebar.width / 2, y: 20 },
      "",
      this.map.tileSize / 3,
      "top",
      "center"
    );

    this.waveText = new Text(
      { x: this.sidebar.position.x + 20, y: 70 },
      "",
      this.map.tileSize / 3,
      "top",
      "left"
    );

    this.livesText = new Text(
      { x: this.sidebar.position.x + 20, y: 100 },
      "",
      this.map.tileSize / 3,
      "top",
      "left"
    );

    this.scoreText = new Text(
      { x: this.sidebar.position.x + 20, y: 130 },
      "",
      this.map.tileSize / 3,
      "top",
      "left"
    );

    this.coinsText = new Text(
      { x: this.sidebar.position.x + 20, y: 160 },
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
    this.sidebar.draw();
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
