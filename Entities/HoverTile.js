class HoverTile {
  constructor(position, size) {
    this.position = position;
    this.size = size;

    this.currentTile = {
      x: Math.floor(this.position.x / this.size),
      y: Math.floor(this.position.y / this.size),
    };
  }

  update() {
    this.currentTile = {
      x: Math.floor(this.position.x / this.size),
      y: Math.floor(this.position.y / this.size),
    };
  }

  draw() {
    ctx.fillStyle = "#FFFFFF33";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
