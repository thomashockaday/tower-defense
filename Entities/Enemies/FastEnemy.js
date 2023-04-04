class FastEnemy extends AbstractEnemy {
  constructor(position, path, tileSize) {
    super(position, tileSize - 16, path, tileSize);

    this.speed = 4;
    this.fullHealth = 2;
    this.health = this.fullHealth;
    this.coins = 5;
  }
}
