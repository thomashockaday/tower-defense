class Wave {
  constructor(enemies) {
    this.enemies = enemies;
    this.started = false;
    this.finished = false;
  }

  update() {}

  draw() {}

  canPlaceTower(tile) {
    return this.tiles[tile.y][tile.x] === 0;
  }

  #getStartingTowers() {
    const towers = [];

    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        if (this.tiles[i][j] === 2) {
          towers.push(
            new Tower(
              { x: j * this.tileSize, y: i * this.tileSize },
              this.tileSize,
              this.tileSize,
              5
            )
          );
        }
      }
    }

    return towers;
  }
}
