class LoadingScreen {
  constructor(map) {
    this.titleText = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 },
      "Loading",
      map.tileSize
    );
  }

  update() {
    //
  }

  draw() {
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.titleText.draw();
  }
}
