export default class AbstractEnemy {
  constructor(position, size, tileSize, waypoints) {
    if (new.target === AbstractEnemy) {
      throw new TypeError("Cannot construct Enemy instances directly");
    }

    this.tilePadding = (tileSize - size) / 2;

    this.position = {
      x: position.x,
      y: position.y + this.tilePadding,
    };

    this.width = size;
    this.height = size;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.tileSize = tileSize;

    this.currentDirection = null;
    this.nextDirection = null;
    this.speed = null;
    this.fullHealth = null;
    this.health = null;
    this.coins = null;

    this.waypoints = waypoints;
    this.waypointIndex = 0;
  }

  update() {
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };

    const waypoint = this.waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.center.y;
    const xDistance = waypoint.x - this.center.x;
    const angle = Math.atan2(yDistance, xDistance);
    this.position.x += Math.cos(angle) * this.speed;
    this.position.y += Math.sin(angle) * this.speed;

    if (
      Math.round(this.center.x) === waypoint.x &&
      Math.round(this.center.y) === waypoint.y &&
      this.waypointIndex < this.waypoints.length - 1
    ) {
      this.waypointIndex++;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#c20102";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    const healthPercentage = (this.health / this.fullHealth) * this.width;
    ctx.fillStyle = "#1e272e";
    ctx.fillRect(this.position.x, this.position.y - 10, this.width, 5);
    ctx.fillStyle = "#4cd137";
    ctx.fillRect(this.position.x, this.position.y - 10, healthPercentage, 5);
  }
}
