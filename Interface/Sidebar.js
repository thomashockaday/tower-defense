class Sidebar {
  constructor(position, width) {
    this.position = position;
    this.width = width;
  }

  draw() {
    ctx.fillStyle = "#01962e";
    ctx.fillRect(this.position.x, this.position.y, this.width, 768);
  }
}
