class PlayingScreen {
  constructor(map) {
    this.map = map;

    this.topbar = new Topbar(
      { x: 0, y: 0 },
      map.tileSize * map.tiles[0].length,
      map.tileSize
    );

    this.hoverTile = new HoverTile(
      {
        x: -1,
        y: -1,
      },
      this.map.tileSize
    );

    this.active = false;
    this.finished = false;
  }

  update() {
    this.hoverTile.update();

    this.hoverTile.position = {
      x: Math.floor(cursor.position.x / this.map.tileSize) * this.map.tileSize,
      y: Math.floor(cursor.position.y / this.map.tileSize) * this.map.tileSize,
    };

    if (this.active && cursor.clicking) {
      this.#clickHandler();
    }
  }

  draw() {
    this.topbar.draw();
    this.hoverTile.draw();
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
