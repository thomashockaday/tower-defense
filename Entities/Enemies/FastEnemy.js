class FastEnemy extends AbstractEnemy {
  constructor(position, path, tileSize) {
    super(position, tileSize - 16, path, tileSize);

    this.speed = 4;
    this.health = 2;
    this.coins = 5;
  }
}
