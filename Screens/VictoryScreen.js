import Text from "../Interface/Text";
import AbstractScreen from "./AbstractScreen";

export default class VictoryScreen extends AbstractScreen {
  constructor(map, canvas, cursor) {
    super(map, canvas, cursor);

    this.victoryText = new Text(
      { x: this.width / 2, y: this.height / 2 },
      "You win!",
      this.map.tileSize
    );
  }

  draw(ctx) {
    this.victoryText.draw(ctx);
  }
}
