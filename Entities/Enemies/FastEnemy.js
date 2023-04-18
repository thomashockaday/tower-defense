import AbstractEnemy from "./AbstractEnemy";

export default class FastEnemy extends AbstractEnemy {
  constructor(position, tileSize, waypoints) {
    super(position, tileSize - 16, tileSize, waypoints);

    this.speed = 4;
    this.fullHealth = 2;
    this.health = this.fullHealth;
    this.coins = 5;
  }
}
