class Button {
  constructor(position, width, height, text) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.text = text;

    this.hover = false;
    this.clicked = false;
  }

  update() {
    this.hover = Collision.rectRect(cursor, this);

    if (this.hover && cursor.clicking) {
      this.clicked = true;
      cursor.clicking = false;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.hover ? "white" : "black";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.fillStyle = this.hover ? "black" : "white";
    const textSize = this.height / 3;
    ctx.font = `${textSize}px sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(
      this.text,
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
  }
}
