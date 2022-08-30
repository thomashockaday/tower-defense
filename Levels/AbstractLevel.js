class AbstractLevel {
  constructor() {
    if (new.target === AbstractLevel) {
      throw new TypeError("Cannot construct Level instances directly");
    }
  }
}
