class GameOverScreen {
  constructor(map) {
    this.gameOverText = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 },
      "Game Over",
      map.tileSize
    );
  }

  update() {
    this.draw();
  }

  draw() {
    this.gameOverText.draw();
  }
}
