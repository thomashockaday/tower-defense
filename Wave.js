class Wave {
  constructor(enemies, goal) {
    this.enemies = enemies;
    this.goal = goal;

    this.finished = false;
  }

  update() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();

      if (Collision.rectRect(this.enemies[i], this.goal)) {
        this.enemies.splice(i, 1);
        lives--;
      }

      if (this.enemies[i].health <= 0) {
        score++;
        coins += this.enemies[i].coins;
        this.enemies.splice(i, 1);
      }
    }
  }

  draw(ctx) {
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
  }
}
