class Map {
  constructor(tiles) {
    this.tiles = tiles;
    this.tileSize = 64;
  }

  draw() {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        ctx.fillStyle = this.tiles[i][j] === 0 ? "grey" : "black";
        ctx.fillRect(
          j * this.tileSize,
          i * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      }
    }
  }
}
