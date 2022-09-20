class StrongEnemy extends AbstractEnemy {
  constructor(position, path, tileSize) {
    super(position, tileSize, path, tileSize);

    this.speed = 2;
    this.health = 6;
    this.coins = 10;
  }
}
