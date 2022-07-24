class ReadyScreen {
  constructor(map) {
    this.titleText = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 - 130 },
      "Tower Defense",
      map.tileSize
    );
    this.instructions1 = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 - 80 },
      "Red enemies will follow the black path to the end of the screen. Yellow towers will try to kill them.",
      map.tileSize / 4
    );
    this.instructions2 = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 - 55 },
      "Place towers by clicking on a grey tile. Towers cost 10 coins. Kill enemies to get 5 coins.",
      map.tileSize / 4
    );
    this.instructions3 = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 - 30 },
      "If a tower makes it to the end, you will lose a life. Don't lose all your lives!",
      map.tileSize / 4
    );
    this.playButton = new Button(
      {
        x: canvas.width / 2 - 125,
        y: canvas.height / 2,
      },
      250,
      100,
      "Play",
      map.tileSize / 2
    );

    canvas.addEventListener("mousemove", (e) => {
      this.#mousemoveHandler(e);
    });
    canvas.addEventListener("click", () => {
      this.#clickHandler();
    });

    this.finished = false;
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

  #mousemoveHandler(e) {
    const cursor = {
      position: {
        x: e.clientX,
        y: e.clientY,
      },
      width: 1,
      height: 1,
    };

    this.playButton.hover = Collision.rectRect(cursor, this.playButton);
  }

  #clickHandler() {
    if (this.playButton.hover) {
      this.finished = true;
      canvas.removeEventListener("mousemove", this.#mousemoveHandler);
      canvas.removeEventListener("click", this.#clickHandler);
      canvas.addEventListener("mousemove", playingMousemoveHandler);
      canvas.addEventListener("click", playingClickHandler);
    }
  }
}
