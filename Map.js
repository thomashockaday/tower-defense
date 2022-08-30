class Map {
  constructor(tiles) {
    this.tiles = tiles;
    this.tileSize = 64;
    this.towers = this.#getStartingTowers();
    this.goal = this.#getGoal();
  }

  draw() {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        let fillStyle = "#83a904";

        switch (this.tiles[i][j]) {
          case 1:
            fillStyle = "#d1c99a";
            break;
          case 3:
            fillStyle = "#d35400";
            break;
        }

        ctx.fillStyle = fillStyle;
        ctx.fillRect(
          j * this.tileSize,
          i * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      }
    }
  }

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

  #getGoal() {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        if (this.tiles[i][j] === 3) {
          return {
            position: { x: j * this.tileSize, y: i * this.tileSize },
            width: this.tileSize,
            height: this.tileSize,
          };
        }
      }
    }
  }
}
