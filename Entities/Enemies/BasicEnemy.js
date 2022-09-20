class BasicEnemy extends AbstractEnemy {
  constructor(position, path, tileSize) {
    super(position, tileSize - 8, path, tileSize);

    this.speed = 2;
    this.health = 3;
    this.coins = 5;
  }
}
