class Topbar {
  constructor(position, width, height) {
    this.position = position;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = "#01962e";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
