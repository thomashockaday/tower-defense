import AbstractTower from "./AbstractTower";

export default class SniperTower extends AbstractTower {
  constructor(position, width, height) {
    super(position, width, height, 7);

    this.cooldown = 40;
    this.maxBullets = 2;
    this.cost = 20;
    this.damage = 5;
    this.bulletSpeed = 50;
    this.colour = "coral";
  }
}
