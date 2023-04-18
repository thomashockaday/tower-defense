export default class Cursor {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.width = 1;
    this.height = 1;
    this.clicking = false;
  }
}
