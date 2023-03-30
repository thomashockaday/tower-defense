const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const level = new BasicLevel();
const map = new Map(level.tiles);
const cursor = new Cursor();

const topbar = new Topbar(
  { x: 0, y: 0 },
  map.tileSize * map.tiles[0].length,
  map.tileSize
);

canvas.width = map.tiles[0].length * map.tileSize;
canvas.height = map.tiles.length * map.tileSize;

const firstPathTile = map.tiles.map((tile) => tile[0]);
const firstPathTilePosition = firstPathTile.indexOf(1);

let lives = 3;
let score = 0;
let coins = 10;

let wave = 0;
let waves = [];

const timeBetweenWaves = 359;
let countdownToNextWave = timeBetweenWaves;

for (let i = 0; i < 3; i++) {
  const enemies = [];

  for (let j = 1; j <= 33; j += 2) {
    enemies.push(
      new BasicEnemy(
        { x: -map.tileSize * j, y: firstPathTilePosition * map.tileSize },
        map.tiles,
        map.tileSize
      )
    );
  }

  for (let j = 1; j <= 17; j += 2) {
    enemies.push(
      new FastEnemy(
        { x: -map.tileSize * j, y: firstPathTilePosition * map.tileSize },
        map.tiles,
        map.tileSize
      )
    );
  }

  for (let j = 1; j <= 9; j += 2) {
    enemies.push(
      new StrongEnemy(
        { x: -map.tileSize * j, y: firstPathTilePosition * map.tileSize },
        map.tiles,
        map.tileSize
      )
    );
  }

  waves.push(new Wave(enemies, map.goal));
}

let step = 0;
let animationFrame;

const gameOverScreen = new GameOverScreen(map);
const loadingScreen = new LoadingScreen(map);
const playingScreen = new PlayingScreen(map, topbar);
const readyScreen = new ReadyScreen(map, playingScreen);
const victoryScreen = new VictoryScreen(map);

const game = new Game(loadingScreen);

function animate() {
  step++;
  animationFrame = requestAnimationFrame(animate);

  if (readyScreen.finished && game.screen === readyScreen) {
    game.screen = playingScreen;
  }

  if (game.screen === playingScreen) {
    map.draw();

    if (waves[wave].enemies.length === 0) {
      waves[wave].finished = true;
      wave++;

      if (wave >= waves.length) {
        game.screen = victoryScreen;
        return;
      }

      countdownToNextWave = timeBetweenWaves;
    }

    if (countdownToNextWave > 0) {
      countdownToNextWave--;
    }

    if (countdownToNextWave <= 0) {
      waves[wave].update();
    }

    for (let i = 0; i < map.towers.length; i++) {
      map.towers[i].update(step, waves[wave].enemies);

      for (let j = 0; j < map.towers[i].bullets.length; j++) {
        for (let k = 0; k < waves[wave].enemies.length; k++) {
          if (
            Collision.circleRect(
              map.towers[i].bullets[j],
              waves[wave].enemies[k]
            )
          ) {
            waves[wave].enemies[k].health--;
            map.towers[i].bullets[j].finished = true;
          }
        }
      }
    }

    playingScreen.waveText.text = `Wave: ${wave + 1}`;
    playingScreen.livesText.text = `Lives: ${lives}`;
    playingScreen.scoreText.text = `Score: ${score}`;
    playingScreen.coinsText.text = `Coins: ${coins}`;

    playingScreen.countdownToNextWaveText.text = `Next: ${Math.floor(
      countdownToNextWave / 60
    )}`;

    if (lives === 0) {
      game.screen = gameOverScreen;
    }
  }

  game.screen.update();
}

window.addEventListener("load", () => {
  game.screen = readyScreen;
  readyScreen.addEventListeners();
});

canvas.addEventListener("mousemove", (e) => {
  cursor.position = {
    x: e.layerX,
    y: e.layerY,
  };
});

animate();
