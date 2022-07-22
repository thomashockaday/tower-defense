class Text {
  constructor(position, text, textSize) {
    this.position = position;
    this.text = text;
    this.textSize = textSize;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.font = `${this.textSize}px sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.position.x, this.position.y);
  }
}
