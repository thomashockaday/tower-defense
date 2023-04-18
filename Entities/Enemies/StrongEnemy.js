import AbstractEnemy from "./AbstractEnemy";

export default class StrongEnemy extends AbstractEnemy {
  constructor(position, tileSize, waypoints) {
    super(position, tileSize, tileSize, waypoints);

    this.speed = 2;
    this.fullHealth = 6;
    this.health = this.fullHealth;
    this.coins = 10;
  }
}
