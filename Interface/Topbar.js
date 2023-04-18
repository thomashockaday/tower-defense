class Topbar {
  constructor(position, width, height) {
    this.position = position;
    this.width = width;
    this.height = height;

    const textSize = this.height / 3;

    this.countdownToNextWaveText = new Text(
      { x: this.position.x + 10, y: this.height / 2 },
      "",
      textSize,
      "middle",
      "left"
    );

    this.waveText = new Text(
      { x: this.position.x + this.width / 5 + 10, y: this.height / 2 },
      "",
      textSize,
      "middle",
      "left"
    );

    this.livesText = new Text(
      { x: this.position.x + (2 * this.width) / 5 + 10, y: this.height / 2 },
      "",
      textSize,
      "middle",
      "left"
    );

    this.scoreText = new Text(
      { x: this.position.x + (3 * this.width) / 5 + 10, y: this.height / 2 },
      "",
      textSize,
      "middle",
      "left"
    );

    this.coinsText = new Text(
      { x: this.position.x + (4 * this.width) / 5 + 10, y: this.height / 2 },
      "",
      textSize,
      "middle",
      "left"
    );
  }

  draw(ctx) {
    ctx.fillStyle = "#01962e";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    this.countdownToNextWaveText.draw(ctx);
    this.waveText.draw(ctx);
    this.livesText.draw(ctx);
    this.scoreText.draw(ctx);
    this.coinsText.draw(ctx);
  }
}
