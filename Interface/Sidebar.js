class Sidebar {
  constructor(position) {
    this.position = position;
    this.width = 256;
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.width, 768);
  }
}
