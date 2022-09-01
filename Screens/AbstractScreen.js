class AbstractScreen {
  constructor(map) {
    if (new.target === AbstractScreen) {
      throw new TypeError("Cannot construct Screen instances directly");
    }

    this.map = map;
  }
}
