class ReadyScreen {
  constructor(map, nextScreen) {
    this.map = map;
    this.nextScreen = nextScreen;

    this.titleText1 = new Text(
      { x: canvas.width / 2, y: this.map.tileSize * 2.5 },
      "Tower",
      this.map.tileSize
    );
    this.titleText2 = new Text(
      { x: canvas.width / 2, y: this.map.tileSize * 3.5 },
      "Defense",
      this.map.tileSize
    );

    this.instructions1 = new Text(
      { x: canvas.width / 2, y: this.map.tileSize * 5 },
      "Enemies will follow the path to the goal",
      this.map.tileSize / 2.5
    );
    this.instructions2 = new Text(
      { x: canvas.width / 2, y: this.map.tileSize * 5.5 },
      "Towers will try to kill them",
      this.map.tileSize / 2.5
    );

    this.instructions3 = new Text(
      { x: canvas.width / 2, y: this.map.tileSize * 6.5 },
      "Place towers by tapping on an empty tile",
      this.map.tileSize / 2.5
    );
    this.instructions4 = new Text(
      { x: canvas.width / 2, y: this.map.tileSize * 7 },
      "Towers cost coins",
      this.map.tileSize / 2.5
    );
    this.instructions5 = new Text(
      { x: canvas.width / 2, y: this.map.tileSize * 7.5 },
      "Coins are rewarded when an enemy is killed",
      this.map.tileSize / 2.5
    );

    this.instructions6 = new Text(
      { x: canvas.width / 2, y: this.map.tileSize * 8.5 },
      "If an enemy makes it to the goal you will lose a life",
      this.map.tileSize / 2.5
    );
    this.instructions7 = new Text(
      { x: canvas.width / 2, y: this.map.tileSize * 9 },
      "Don't lose all your lives!",
      this.map.tileSize / 2.5
    );

    const buttonWidth = this.map.tileSize * 4;
    this.playButton = new Button(
      {
        x: canvas.width / 2 - buttonWidth / 2,
        y: this.map.tileSize * 10,
      },
      buttonWidth,
      this.map.tileSize * 1.5,
      "Play",
      this.map.tileSize / 2
    );

    this.hasEventListeners = false;
    this.finished = false;
  }

  update() {
    if (this.playButton.clicked) {
      this.finished = true;
      this.nextScreen.addEventListeners();
    }

    this.draw();
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

  addEventListeners() {
    if (!this.hasEventListeners) {
      this.playButton.addEventListeners();
      this.hasEventListeners = true;
    }
  }
}
