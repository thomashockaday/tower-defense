export default class AbstractScreen {
  constructor(map, canvas, cursor) {
    if (new.target === AbstractScreen) {
      throw new TypeError("Cannot construct Screen instances directly");
    }

    this.map = map;
    this.cursor = cursor;

    this.width = canvas.width;
    this.height = canvas.height;
  }

  update() {
    //
  }

  draw(ctx) {
    //
  }
}
