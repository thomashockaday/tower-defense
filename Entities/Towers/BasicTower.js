class BasicTower extends AbstractTower {
  constructor(position, width, height) {
    super(position, width, height, 5);

    this.cooldown = 30;
    this.maxBullets = 2;
    this.cost = 10;
  }
}
