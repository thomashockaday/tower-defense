import Button from "../Interface/Button";
import Text from "../Interface/Text";
import AbstractScreen from "./AbstractScreen";

export default class ReadyScreen extends AbstractScreen {
  constructor(map, canvas, cursor) {
    super(map, canvas, cursor);

    this.titleText1 = new Text(
      { x: this.width / 2, y: this.map.tileSize * 2.5 },
      "Tower",
      this.map.tileSize
    );
    this.titleText2 = new Text(
      { x: this.width / 2, y: this.map.tileSize * 3.5 },
      "Defense",
      this.map.tileSize
    );

    this.instructions1 = new Text(
      { x: this.width / 2, y: this.map.tileSize * 5 },
      "Enemies will follow the path to the goal",
      this.map.tileSize / 2.5
    );
    this.instructions2 = new Text(
      { x: this.width / 2, y: map.tileSize * 5.5 },
      "Towers will try to kill them",
      map.tileSize / 2.5
    );

    this.instructions3 = new Text(
      { x: this.width / 2, y: map.tileSize * 6.5 },
      "Place towers by tapping on an empty tile",
      map.tileSize / 2.5
    );
    this.instructions4 = new Text(
      { x: this.width / 2, y: map.tileSize * 7 },
      "Towers cost coins",
      map.tileSize / 2.5
    );
    this.instructions5 = new Text(
      { x: this.width / 2, y: map.tileSize * 7.5 },
      "Coins are rewarded when an enemy is killed",
      map.tileSize / 2.5
    );

    this.instructions6 = new Text(
      { x: this.width / 2, y: map.tileSize * 8.5 },
      "If an enemy makes it to the goal you will lose a life",
      map.tileSize / 2.5
    );
    this.instructions7 = new Text(
      { x: this.width / 2, y: map.tileSize * 9 },
      "Don't lose all your lives!",
      map.tileSize / 2.5
    );

    const buttonWidth = map.tileSize * 4;
    this.playButton = new Button(
      {
        x: this.width / 2 - buttonWidth / 2,
        y: map.tileSize * 10,
      },
      buttonWidth,
      map.tileSize * 1.5,
      "Play",
      this.cursor
    );

    this.finished = false;
  }

  update() {
    this.playButton.update();

    if (this.playButton.clicked) {
      this.finished = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, this.width, this.height);

    this.titleText1.draw(ctx);
    this.titleText2.draw(ctx);
    this.instructions1.draw(ctx);
    this.instructions2.draw(ctx);
    this.instructions3.draw(ctx);
    this.instructions4.draw(ctx);
    this.instructions5.draw(ctx);
    this.instructions6.draw(ctx);
    this.instructions7.draw(ctx);
    this.playButton.draw(ctx);
  }
}
