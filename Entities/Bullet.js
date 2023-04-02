class Bullet {
  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;

    this.radius = 8;
    this.speed = 16;
    this.finished = false;
  }

  update() {
    this.position.x += this.velocity.x * this.speed;
    this.position.y += this.velocity.y * this.speed;

    if (
      this.position.x > canvas.width ||
      this.position.x + this.radius < 0 ||
      this.position.y < 0 ||
      this.position.y + this.radius > canvas.height
    ) {
      this.finished = true;
    }
  }

  draw() {
    ctx.fillStyle = "#0060c1";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
