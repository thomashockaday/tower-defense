class Enemy {
  constructor(position, size, path, tileSize) {
    this.tilePadding = (tileSize - size) / 2;

    this.position = {
      x: position.x,
      y: position.y + this.tilePadding,
    };

    this.width = size;
    this.height = size;
    this.path = path;
    this.tileSize = tileSize;

    this.currentDirection = null;
    this.nextDirection = null;
    this.speed = 4;
    this.health = 3;
    this.coins = 5;
  }

  update() {
    this.currentDirection = this.nextDirection;
    this.nextDirection = this.#calculateNextDirection();

    if (this.nextDirection === "up") {
      this.position.y -= this.speed;
    }

    if (this.nextDirection === "right") {
      this.position.x += this.speed;
    }

    if (this.nextDirection === "down") {
      this.position.y += this.speed;
    }

    if (this.nextDirection === "left") {
      this.position.x -= this.speed;
    }

    this.draw();
  }

  draw() {
    ctx.fillStyle = "#c20102";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  #calculateNextDirection() {
    if (this.position.x < 0) {
      return "right";
    }

    const currentTileX = (this.position.x - this.tilePadding) / this.tileSize;
    const currentTileY = (this.position.y - this.tilePadding) / this.tileSize;
    const flooredCurrentTileX = Math.floor(currentTileX);
    const flooredCurrentTileY = Math.floor(currentTileY);

    if (
      currentTileX !== flooredCurrentTileX ||
      currentTileY !== flooredCurrentTileY
    ) {
      return this.currentDirection;
    }

    if (
      this.path[flooredCurrentTileY - 1][flooredCurrentTileX] === 1 &&
      this.currentDirection !== "down"
    ) {
      return "up";
    }

    if (
      this.path[flooredCurrentTileY][flooredCurrentTileX + 1] === 1 &&
      this.currentDirection !== "left"
    ) {
      return "right";
    }

    if (
      this.path[flooredCurrentTileY + 1][flooredCurrentTileX] === 1 &&
      this.currentDirection !== "up"
    ) {
      return "down";
    }

    if (
      this.path[flooredCurrentTileY][flooredCurrentTileX - 1] === 1 &&
      this.currentDirection !== "right"
    ) {
      return "left";
    }

    return this.currentDirection;
  }
}
