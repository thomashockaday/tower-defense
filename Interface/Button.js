class Button {
  constructor(position, width, height, text, textSize) {
    this.position = position;
    this.text = text;
    this.textSize = textSize;
    this.width = width;
    this.height = height;

    this.hover = false;
    this.clicked = false;
  }

  update() {
    this.hover = Collision.rectRect(cursor, this);

    if (this.hover && cursor.clicking) {
      this.clicked = true;
    }
  }

  draw() {
    ctx.fillStyle = this.hover ? "white" : "black";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.fillStyle = this.hover ? "black" : "white";
    ctx.font = `${this.textSize}px sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(
      this.text,
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
  }
}
