class BasicEnemy extends AbstractEnemy {
  constructor(position, tileSize, waypoints) {
    super(position, tileSize - 8, tileSize, waypoints);

    this.speed = 2;
    this.fullHealth = 3;
    this.health = this.fullHealth;
    this.coins = 5;
  }
}
