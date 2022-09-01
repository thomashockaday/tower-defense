class GameOverScreen extends AbstractScreen {
  constructor(map) {
    super(map);

    this.gameOverText = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 },
      "Game Over",
      this.map.tileSize
    );
  }

  update() {
    this.draw();
  }

  draw() {
    this.gameOverText.draw();
  }
}
