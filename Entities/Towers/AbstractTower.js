import Collision from "../../Utils/Collision";
import Bullet from "../Bullet";

export default class AbstractTower {
  constructor(position, width, height, radius) {
    if (new.target === AbstractTower) {
      throw new TypeError("Cannot construct Tower instances directly");
    }

    this.position = position;
    this.width = width;
    this.height = height;
    this.radius = radius;

    this.cooldown = null;
    this.maxBullets = null;
    this.cost = null;
    this.damage = null;
    this.bulletSpeed = null;
    this.colour = null;

    this.range = {
      position: {
        x: this.position.x - Math.floor(this.radius / 2) * width,
        y: this.position.y - Math.floor(this.radius / 2) * height,
      },
      width: this.radius * width,
      height: this.radius * height,
    };
    this.bullets = [];
  }

  update(step, enemies) {
    if (step % this.cooldown === 0) {
      for (let i = 0; i < enemies.length; i++) {
        if (
          Collision.rectRect(enemies[i], this.range) &&
          enemies[i].position.x + enemies[i].width > 0 &&
          this.bullets.length < this.maxBullets
        ) {
          this.#shoot(enemies[i]);
          break;
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

  draw(ctx) {
    ctx.fillStyle = this.colour;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.fillStyle = "#FFFF0011";
    ctx.fillRect(
      this.range.position.x,
      this.range.position.y,
      this.range.width,
      this.range.height
    );

    this.bullets.forEach((bullet) => {
      bullet.draw(ctx);
    });
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
      },
      this.bulletSpeed
    );
    this.bullets.push(bullet);
  }
}
