class BasicEnemy extends AbstractEnemy {
  constructor(position, path, tileSize) {
    super(position, tileSize - 8, path, tileSize);

    this.speed = 2;
    this.fullHealth = 3;
    this.health = this.fullHealth;
    this.coins = 5;
  }
}
