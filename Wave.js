export default class Wave {
  constructor(enemies) {
    this.enemies = enemies;

    this.finished = false;
  }

  update() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();
    }
  }

  draw(ctx) {
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
  }
}
