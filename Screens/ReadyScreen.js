class ReadyScreen extends AbstractScreen {
  constructor(map, nextScreen) {
    super(map);

    this.nextScreen = nextScreen;

    this.titleText = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 - 130 },
      "Tower Defense",
      this.map.tileSize
    );
    this.instructions1 = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 - 80 },
      "Enemies will follow the path to the goal at the other end of the screen. Towers will try to kill them.",
      this.map.tileSize / 4
    );
    this.instructions2 = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 - 55 },
      "Place towers by clicking on an empty tile. Towers cost 10 coins. Kill enemies to get 5 coins.",
      this.map.tileSize / 4
    );
    this.instructions3 = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 - 30 },
      "If a tower makes it to the goal, you will lose a life. Don't lose all your lives!",
      this.map.tileSize / 4
    );
    this.playButton = new Button(
      {
        x: canvas.width / 2 - 125,
        y: canvas.height / 2,
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

    this.titleText.draw();
    this.instructions1.draw();
    this.instructions2.draw();
    this.instructions3.draw();
    this.playButton.draw();
  }

  addEventListeners() {
    if (!this.hasEventListeners) {
      this.playButton.addEventListeners();
      this.hasEventListeners = true;
    }
  }
}
