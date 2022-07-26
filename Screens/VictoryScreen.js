class VictoryScreen {
  constructor(map) {
    this.victoryText = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 },
      "You win!",
      map.tileSize
    );
  }

  update() {
    this.draw();
  }

  draw() {
    this.victoryText.draw();
  }
}
