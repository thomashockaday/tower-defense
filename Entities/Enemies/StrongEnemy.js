class StrongEnemy extends AbstractEnemy {
  constructor(position, path, tileSize) {
    super(position, tileSize, path, tileSize);

    this.speed = 2;
    this.fullHealth = 6;
    this.health = this.fullHealth;
    this.coins = 10;
  }
}
