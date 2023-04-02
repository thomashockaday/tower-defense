class ReadyScreen {
  constructor(map) {
    this.titleText1 = new Text(
      { x: canvas.width / 2, y: map.tileSize * 2.5 },
      "Tower",
      map.tileSize
    );
    this.titleText2 = new Text(
      { x: canvas.width / 2, y: map.tileSize * 3.5 },
      "Defense",
      map.tileSize
    );

    this.instructions1 = new Text(
      { x: canvas.width / 2, y: map.tileSize * 5 },
      "Enemies will follow the path to the goal",
      map.tileSize / 2.5
    );
    this.instructions2 = new Text(
      { x: canvas.width / 2, y: map.tileSize * 5.5 },
      "Towers will try to kill them",
      map.tileSize / 2.5
    );

    this.instructions3 = new Text(
      { x: canvas.width / 2, y: map.tileSize * 6.5 },
      "Place towers by tapping on an empty tile",
      map.tileSize / 2.5
    );
    this.instructions4 = new Text(
      { x: canvas.width / 2, y: map.tileSize * 7 },
      "Towers cost coins",
      map.tileSize / 2.5
    );
    this.instructions5 = new Text(
      { x: canvas.width / 2, y: map.tileSize * 7.5 },
      "Coins are rewarded when an enemy is killed",
      map.tileSize / 2.5
    );

    this.instructions6 = new Text(
      { x: canvas.width / 2, y: map.tileSize * 8.5 },
      "If an enemy makes it to the goal you will lose a life",
      map.tileSize / 2.5
    );
    this.instructions7 = new Text(
      { x: canvas.width / 2, y: map.tileSize * 9 },
      "Don't lose all your lives!",
      map.tileSize / 2.5
    );

    const buttonWidth = map.tileSize * 4;
    this.playButton = new Button(
      {
        x: canvas.width / 2 - buttonWidth / 2,
        y: map.tileSize * 10,
      },
      buttonWidth,
      map.tileSize * 1.5,
      "Play",
      map.tileSize / 2
    );

    this.finished = false;
  }

  update() {
    this.playButton.update();

    if (this.playButton.clicked) {
      this.finished = true;
    }
  }

  draw() {
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.titleText1.draw();
    this.titleText2.draw();
    this.instructions1.draw();
    this.instructions2.draw();
    this.instructions3.draw();
    this.instructions4.draw();
    this.instructions5.draw();
    this.instructions6.draw();
    this.instructions7.draw();
    this.playButton.draw();
  }
}
