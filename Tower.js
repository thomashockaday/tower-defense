class Tower {
  constructor(position) {
    this.position = position;
    this.width = tileSize;
    this.height = tileSize;
    this.radius = 5;
    this.range = {
      position: {
        x: this.position.x - Math.floor(this.radius / 2) * tileSize,
        y: this.position.y - Math.floor(this.radius / 2) * tileSize,
      },
      width: this.radius * tileSize,
      height: this.radius * tileSize,
    };
    this.cooldown = 50;
  }

  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.fillStyle = "#FFFF0022";
    ctx.fillRect(
      this.range.position.x,
      this.range.position.y,
      this.range.width,
      this.range.height
    );
  }

  update(step, enemies) {
    if (step % this.cooldown === 0) {
      for (let i = 0; i < enemies.length; i++) {
        if (rectRectCollision(enemies[i], this.range)) {
          console.log("shoot enemy " + i);
        }
      }
    }

    this.draw();
  }
}
