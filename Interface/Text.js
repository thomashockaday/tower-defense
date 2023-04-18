class Text {
  constructor(
    position,
    text,
    textSize,
    baseline = "middle",
    textAlign = "center"
  ) {
    this.position = position;
    this.text = text;
    this.textSize = textSize;
    this.baseline = baseline;
    this.textAlign = textAlign;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.font = `${this.textSize}px sans-serif`;
    ctx.textBaseline = this.baseline;
    ctx.textAlign = this.textAlign;
    ctx.fillText(this.text, this.position.x, this.position.y);
  }
}
