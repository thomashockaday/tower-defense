class Wave {
  constructor(enemies) {
    this.enemies = enemies;

    this.finished = false;
  }

  update() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();

      if (this.enemies[i].position.x >= canvas.width) {
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
}
