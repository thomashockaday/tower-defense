class ReadyScreen {
  constructor(map, nextScreen) {
    this.map = map;
    this.nextScreen = nextScreen;

    this.titleText1 = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 - 140 },
      "Tower",
      this.map.tileSize
    );
    this.titleText2 = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 - 80 },
      "Defense",
      this.map.tileSize
    );
    this.instructions1 = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 - 30 },
      "Enemies will follow the path to the goal at the other end of the screen.",
      this.map.tileSize / 4
    );
    this.instructions2 = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 - 5 },
      "Towers will try to kill them. Place towers by tapping on an empty tile.",
      this.map.tileSize / 4
    );
    this.instructions3 = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 + 20 },
      "Towers cost coins. Kill enemies to get coins.",
      this.map.tileSize / 4
    );
    this.instructions4 = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 + 45 },
      "If a tower makes it to the goal, you will lose a life. Don't lose all your lives!",
      this.map.tileSize / 4
    );
    this.playButton = new Button(
      {
        x: canvas.width / 2 - 125,
        y: canvas.height / 2 + 70,
      },
      250,
      100,
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
    this.playButton.draw();
  }

  addEventListeners() {
    if (!this.hasEventListeners) {
      this.playButton.addEventListeners();
      this.hasEventListeners = true;
    }
  }
}
