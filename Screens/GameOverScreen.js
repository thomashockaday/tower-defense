class GameOverScreen {
  constructor(map) {
    this.map = map;

    this.gameOverText = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 },
      "Game Over",
      this.map.tileSize
    );
  }

  update() {
    //
  }

  draw(ctx) {
    this.gameOverText.draw(ctx);
  }
}
