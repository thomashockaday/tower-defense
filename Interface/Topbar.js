class Topbar {
  constructor(position, width, height) {
    this.position = position;
    this.width = width;
    this.height = height;

    const textSize = this.height / 3;

    this.countdownToNextWaveText = new Text(
      { x: this.position.x, y: 20 },
      "",
      textSize,
      "top",
      "left"
    );

    this.waveText = new Text(
      { x: this.position.x + this.width / 5, y: 20 },
      "",
      textSize,
      "top",
      "left"
    );

    this.livesText = new Text(
      { x: this.position.x + (2 * this.width) / 5, y: 20 },
      "",
      textSize,
      "top",
      "left"
    );

    this.scoreText = new Text(
      { x: this.position.x + (3 * this.width) / 5, y: 20 },
      "",
      textSize,
      "top",
      "left"
    );

    this.coinsText = new Text(
      { x: this.position.x + (4 * this.width) / 5, y: 20 },
      "",
      textSize,
      "top",
      "left"
    );
  }

  draw() {
    ctx.fillStyle = "#01962e";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    this.countdownToNextWaveText.draw();
    this.waveText.draw();
    this.livesText.draw();
    this.scoreText.draw();
    this.coinsText.draw();
  }
}
