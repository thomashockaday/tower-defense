class Enemy {
  constructor(position) {
    this.position = position;
    this.width = tileSize;
    this.height = tileSize;

    this.currentDirection = null;
    this.nextDirection = null;

    this.speed = 4;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
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

  #calculateNextDirection() {
    if (this.position.x < 0) {
      return "right";
    }

    const currentTileX = this.position.x / this.width;
    const currentTileY = this.position.y / this.height;

    if (
      currentTileX === Math.floor(currentTileX) &&
      currentTileY === Math.floor(currentTileY) &&
      tiles[Math.floor(currentTileY) - 1][Math.floor(currentTileX)] === 1 &&
      this.currentDirection !== "down"
    ) {
      return "up";
    }

    if (
      currentTileX === Math.floor(currentTileX) &&
      currentTileY === Math.floor(currentTileY) &&
      tiles[Math.ceil(currentTileY)][Math.ceil(currentTileX + 1)] === 1 &&
      this.currentDirection !== "left"
    ) {
      return "right";
    }

    if (
      currentTileX === Math.floor(currentTileX) &&
      currentTileY === Math.floor(currentTileY) &&
      tiles[Math.ceil(currentTileY) + 1][Math.floor(currentTileX)] === 1 &&
      this.currentDirection !== "up"
    ) {
      return "down";
    }

    if (
      currentTileX === Math.floor(currentTileX) &&
      currentTileY === Math.floor(currentTileY) &&
      tiles[Math.ceil(currentTileY)][Math.floor(currentTileX - 1)] === 1 &&
      this.currentDirection !== "right"
    ) {
      return "left";
    }

    return this.currentDirection;
  }
}
