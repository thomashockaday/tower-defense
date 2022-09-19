class LoadingScreen {
  constructor(map) {
    this.map = map;
    this.map = map;

    this.titleText = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 - 130 },
      "Loading",
      this.map.tileSize
    );

    this.finished = false;
  }

  update() {
    this.draw();
  }

  draw() {
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.titleText.draw();
  }
}
