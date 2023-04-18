class LoadingScreen extends AbstractScreen {
  constructor(map, canvas, cursor) {
    super(map, canvas, cursor);

    this.titleText = new Text(
      { x: this.width / 2, y: this.height / 2 },
      "Loading",
      this.map.tileSize
    );
  }

  draw(ctx) {
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, this.width, this.height);

    this.titleText.draw(ctx);
  }
}
