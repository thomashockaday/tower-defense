class Enemy {
  constructor(position) {
    this.position = position;
    this.width = tileSize;
    this.height = tileSize;

    this.currentDirection = null;
    this.nextDirection = null;
    this.speed = 2;
    this.health = 5;
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
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  #calculateNextDirection() {
    if (this.position.x < 0) {
      return "right";
    }

    const currentTileX = this.position.x / this.width;
    const currentTileY = this.position.y / this.height;
    const flooredCurrentTileX = Math.floor(currentTileX);
    const flooredCurrentTileY = Math.floor(currentTileY);

    if (
      currentTileX !== flooredCurrentTileX ||
      currentTileY !== flooredCurrentTileY
    ) {
      return this.currentDirection;
    }

    if (
      tiles[flooredCurrentTileY - 1][flooredCurrentTileX] === 1 &&
      this.currentDirection !== "down"
    ) {
      return "up";
    }

    if (
      tiles[flooredCurrentTileY][flooredCurrentTileX + 1] === 1 &&
      this.currentDirection !== "left"
    ) {
      return "right";
    }

    if (
      tiles[flooredCurrentTileY + 1][flooredCurrentTileX] === 1 &&
      this.currentDirection !== "up"
    ) {
      return "down";
    }

    if (
      tiles[flooredCurrentTileY][flooredCurrentTileX - 1] === 1 &&
      this.currentDirection !== "right"
    ) {
      return "left";
    }

    return this.currentDirection;
  }
}
