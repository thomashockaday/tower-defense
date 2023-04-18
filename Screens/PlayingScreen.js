class PlayingScreen extends AbstractScreen {
  constructor(map, canvas, cursor) {
    super(map, canvas, cursor);

    this.topbar = new Topbar(
      { x: 0, y: 0 },
      this.map.tileSize * this.map.tiles[0].length,
      this.map.tileSize
    );

    this.hoverTile = {
      position: {
        x:
          Math.floor(this.cursor.position.x / this.map.tileSize) *
          this.map.tileSize,
        y:
          Math.floor(this.cursor.position.y / this.map.tileSize) *
          this.map.tileSize,
      },
      tile: {
        x: Math.floor(this.cursor.position.x / this.map.tileSize),
        y: Math.floor(this.cursor.position.y / this.map.tileSize),
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
  }

  draw(ctx) {
    ctx.fillStyle = "#FFFFFF33";
    ctx.fillRect(
      this.hoverTile.position.x,
      this.hoverTile.position.y,
      this.map.tileSize,
      this.map.tileSize
    );

    this.topbar.draw(ctx);
  }
}
