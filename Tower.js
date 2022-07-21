class Tower {
  constructor(position, radius) {
    this.position = position;

    this.width = tileSize;
    this.height = tileSize;
    this.radius = radius;
    this.range = {
      position: {
        x: this.position.x - Math.floor(this.radius / 2) * tileSize,
        y: this.position.y - Math.floor(this.radius / 2) * tileSize,
      },
      width: this.radius * tileSize,
      height: this.radius * tileSize,
    };
    this.cooldown = 50;
    this.bullets = [];
    this.maxBullets = 2;
  }

  update(step, enemies) {
    this.draw();

    if (step % this.cooldown === 0) {
      for (let i = 0; i < enemies.length; i++) {
        if (
          rectRectCollision(enemies[i], this.range) &&
          this.bullets.length < this.maxBullets
        ) {
          this.#shoot(enemies[i]);
        }
      }
    }

    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();

      if (this.bullets[i].finished === true) {
        this.bullets.splice(i, 1);
      }
    }
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

  #shoot(enemy) {
    const angle = Math.atan2(
      enemy.position.y + enemy.height / 2 - (this.position.y + this.height / 2),
      enemy.position.x + enemy.width / 2 - (this.position.x + this.width / 2)
    );

    const bullet = new Bullet(
      {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height / 2,
      },
      {
        x: Math.cos(angle),
        y: Math.sin(angle),
      }
    );
    this.bullets.push(bullet);
  }
}
