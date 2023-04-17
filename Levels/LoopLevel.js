class LoopLevel {
  constructor() {
    /**
     * Key:
     * 0: Blank
     * 1: Start
     * 2: Path
     * 3: Goal
     * 9: Basic Tower
     */
    this.tiles = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 9, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
      [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    ];

    this.waypoints = [
      {
        x: 5 * 48 + 24,
        y: 13 * 48 + 100,
      },
      {
        x: 5 * 48 + 24,
        y: 2 * 48 + 24,
      },
      {
        x: 2 * 48 + 24,
        y: 2 * 48 + 24,
      },
      {
        x: 2 * 48 + 24,
        y: 7 * 48 + 24,
      },
      {
        x: 12 * 48,
        y: 7 * 48 + 24,
      },
    ];
  }
}