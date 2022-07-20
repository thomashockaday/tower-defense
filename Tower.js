class Tower {
  constructor(position) {
    this.position = position;
    this.width = tileSize;
    this.height = tileSize;
    this.radius = 5;
    this.cooldown = 50;
  }

  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.fillStyle = "#FFFF0022";
    const firstX = this.position.x - Math.floor(this.radius / 2) * tileSize;
    const firstY = this.position.y - Math.floor(this.radius / 2) * tileSize;

    ctx.fillRect(
      firstX,
      firstY,
      this.radius * tileSize,
      this.radius * tileSize
    );
  }

  update(step) {
    if (step % this.cooldown === 0) {
      console.log("shoot");
    }

    this.draw();
  }
}
