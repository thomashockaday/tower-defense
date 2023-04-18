class PlayingScreen {
  constructor(map) {
    this.map = map;

    this.topbar = new Topbar(
      { x: 0, y: 0 },
      map.tileSize * map.tiles[0].length,
      map.tileSize
    );

    this.hoverTile = {
      position: {
        x: Math.floor(cursor.position.x / map.tileSize) * map.tileSize,
        y: Math.floor(cursor.position.y / map.tileSize) * map.tileSize,
      },
      tile: {
        x: Math.floor(cursor.position.x / map.tileSize),
        y: Math.floor(cursor.position.y / map.tileSize),
      },
    };

    this.active = false;
    this.finished = false;
  }

  update() {
    this.hoverTile = {
      position: {
        x:
          Math.floor(cursor.position.x / this.map.tileSize) * this.map.tileSize,
        y:
          Math.floor(cursor.position.y / this.map.tileSize) * this.map.tileSize,
      },
      currentTile: {
        x: Math.floor(cursor.position.x / this.map.tileSize),
        y: Math.floor(cursor.position.y / this.map.tileSize),
      },
    };

    if (this.active && cursor.clicking) {
      this.#clickHandler();
      cursor.clicking = false;
    }
  }

  draw(ctx) {
    this.topbar.draw(ctx);

    ctx.fillStyle = "#FFFFFF33";
    ctx.fillRect(
      this.hoverTile.position.x,
      this.hoverTile.position.y,
      this.map.tileSize,
      this.map.tileSize
    );
  }

  #clickHandler() {
    const tower = new BasicTower(
      {
        x: this.hoverTile.position.x,
        y: this.hoverTile.position.y,
      },
      this.map.tileSize,
      this.map.tileSize
    );

    if (
      this.map.canPlaceTower(this.hoverTile.currentTile) &&
      coins >= tower.cost
    ) {
      this.map.tiles[this.hoverTile.currentTile.y][
        this.hoverTile.currentTile.x
      ] = 9;
      this.map.towers.push(tower);
      coins -= tower.cost;
    }
  }
}
