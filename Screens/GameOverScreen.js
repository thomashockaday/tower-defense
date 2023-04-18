import Text from "../Interface/Text";
import AbstractScreen from "./AbstractScreen";

export default class GameOverScreen extends AbstractScreen {
  constructor(map, canvas, cursor) {
    super(map, canvas, cursor);

    this.gameOverText = new Text(
      { x: this.width / 2, y: this.height / 2 },
      "Game Over",
      this.map.tileSize
    );
  }

  draw(ctx) {
    this.gameOverText.draw(ctx);
  }
}
