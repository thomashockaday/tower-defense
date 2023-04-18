export default class Bullet {
  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;

    this.radius = 4;
    this.speed = 20;
    this.finished = false;
  }

  update() {
    this.position.x += this.velocity.x * this.speed;
    this.position.y += this.velocity.y * this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = "#0060c1";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
