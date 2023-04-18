import Text from "../Interface/Text";

export default class VictoryScreen {
  constructor(map, canvas) {
    this.map = map;

    this.victoryText = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 },
      "You win!",
      this.map.tileSize
    );
  }

  update() {
    //
  }

  draw(ctx) {
    this.victoryText.draw(ctx);
  }
}
