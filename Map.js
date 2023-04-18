import BasicTower from "./Entities/Towers/BasicTower";

export default class Map {
  constructor(tiles) {
    this.tiles = tiles;
    this.tileSize = 48;
    this.towers = this.#getStartingTowers();
    this.goal = this.#getGoal();
  }

  draw(ctx) {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        let fillStyle = "#83a904";

        switch (this.tiles[i][j]) {
          case 1:
          case 2:
            fillStyle = "#d1c99a";
            break;
          case 3:
            fillStyle = "#c5bb81";
            break;
        }

        ctx.fillStyle = fillStyle;
        ctx.fillRect(
          j * this.tileSize,
          i * this.tileSize,
          this.tileSize,
          this.tileSize
        );

        const pathTiles = [1, 2, 3];

        if (pathTiles.includes(this.tiles[i][j])) {
          ctx.fillStyle = "#c5bb81";

          if (
            this.tiles[i - 1] !== undefined &&
            !pathTiles.includes(this.tiles[i - 1][j])
          ) {
            ctx.fillRect(
              j * this.tileSize,
              i * this.tileSize,
              this.tileSize,
              this.tileSize / 10
            );
          }

          if (
            this.tiles[i][j + 1] !== undefined &&
            !pathTiles.includes(this.tiles[i][j + 1])
          ) {
            ctx.fillRect(
              j * this.tileSize + (this.tileSize / 10) * 9,
              i * this.tileSize,
              this.tileSize / 10,
              this.tileSize
            );
          }

          if (
            this.tiles[i + 1] !== undefined &&
            !pathTiles.includes(this.tiles[i + 1][j])
          ) {
            ctx.fillRect(
              j * this.tileSize,
              i * this.tileSize + (this.tileSize / 10) * 9,
              this.tileSize,
              this.tileSize / 10
            );
          }

          if (
            this.tiles[i][j - 1] !== undefined &&
            !pathTiles.includes(this.tiles[i][j - 1])
          ) {
            ctx.fillRect(
              j * this.tileSize,
              i * this.tileSize,
              this.tileSize / 10,
              this.tileSize
            );
          }

          if (
            this.tiles[i - 1] !== undefined &&
            this.tiles[i][j - 1] !== undefined &&
            pathTiles.includes(this.tiles[i - 1][j]) &&
            pathTiles.includes(this.tiles[i][j - 1])
          ) {
            ctx.fillRect(
              j * this.tileSize,
              i * this.tileSize,
              this.tileSize / 10,
              this.tileSize / 10
            );
          }

          if (
            this.tiles[i - 1] !== undefined &&
            this.tiles[i][j + 1] !== undefined &&
            pathTiles.includes(this.tiles[i - 1][j]) &&
            pathTiles.includes(this.tiles[i][j + 1])
          ) {
            ctx.fillRect(
              j * this.tileSize + (this.tileSize / 10) * 9,
              i * this.tileSize,
              this.tileSize / 10,
              this.tileSize / 10
            );
          }

          if (
            this.tiles[i + 1] !== undefined &&
            this.tiles[i][j + 1] !== undefined &&
            pathTiles.includes(this.tiles[i + 1][j]) &&
            pathTiles.includes(this.tiles[i][j + 1])
          ) {
            ctx.fillRect(
              j * this.tileSize + (this.tileSize / 10) * 9,
              i * this.tileSize + (this.tileSize / 10) * 9,
              this.tileSize / 10,
              this.tileSize / 10
            );
          }

          if (
            this.tiles[i + 1] !== undefined &&
            this.tiles[i][j - 1] !== undefined &&
            pathTiles.includes(this.tiles[i + 1][j]) &&
            pathTiles.includes(this.tiles[i][j - 1])
          ) {
            ctx.fillRect(
              j * this.tileSize,
              i * this.tileSize + (this.tileSize / 10) * 9,
              this.tileSize / 10,
              this.tileSize / 10
            );
          }
        }
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
        if (this.tiles[i][j] === 9) {
          towers.push(
            new BasicTower(
              { x: j * this.tileSize, y: i * this.tileSize },
              this.tileSize,
              this.tileSize
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
