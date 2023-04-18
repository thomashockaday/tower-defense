import Text from "../Interface/Text";

export default class LoadingScreen {
  constructor(map, canvas) {
    this.canvas = canvas;

    this.titleText = new Text(
      { x: canvas.width / 2, y: canvas.height / 2 },
      "Loading",
      map.tileSize
    );
  }

  update() {
    //
  }

  draw(ctx) {
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.titleText.draw(ctx);
  }
}
