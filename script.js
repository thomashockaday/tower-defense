const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

/**
 * Key:
 * 0: Blank
 * 1: Path
 * 2: Basic Tower
 */
const tiles = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const map = new Map(tiles);

canvas.width = map.tiles[0].length * map.tileSize;
canvas.height = map.tiles.length * map.tileSize;

const firstPathTile = map.tiles.map((tile) => tile[0]);
const firstPathTilePosition = firstPathTile.indexOf(1);

let lives = 3;
let score = 0;
let coins = 10;

let wave = 0;
let waves = [];

const timeBetweenWaves = 5;
let countdownToNextWave = 0;

for (let i = 0; i < 2; i++) {
  const enemies = [];

  for (let j = 1; j <= 33; j += 2) {
    enemies.push(
      new Enemy(
        { x: -map.tileSize * j, y: firstPathTilePosition * map.tileSize },
        map.tileSize,
        map.tiles
      )
    );
  }

  waves.push(new Wave(enemies));
}

let step = 0;
let animationFrame;
const game = new Game();

const gameOverScreen = new GameOverScreen(map);
const loadingScreen = new LoadingScreen(map);
const playingScreen = new PlayingScreen(map);
const readyScreen = new ReadyScreen(map, playingScreen);
const victoryScreen = new VictoryScreen(map);

function animate() {
  step++;
  animationFrame = requestAnimationFrame(animate);

  if (readyScreen.finished && game.state === GameState.READY) {
    game.state = GameState.PLAYING;
  }

  if (game.state === GameState.READY) {
    readyScreen.update();
  }

  if (game.state === GameState.LOADING) {
    loadingScreen.update();
  }

  if (game.state === GameState.GAMEOVER) {
    gameOverScreen.update();
    cancelAnimationFrame(animationFrame);
    playingScreen.removeEventListeners();
    return;
  }

  if (game.state === GameState.VICTORY) {
    victoryScreen.update();
    playingScreen.removeEventListeners();
  }

  if (game.state === GameState.PLAYING) {
    map.draw();

    if (waves[wave].enemies.length === 0) {
      waves[wave].finished = true;
      wave++;

      if (wave >= waves.length) {
        game.state = GameState.VICTORY;
        return;
      }

      countdownToNextWave = timeBetweenWaves;
    }

    if (countdownToNextWave > 0 && step % 60 === 0) {
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
    playingScreen.countdownToNextWaveText.text = `Next wave in: ${countdownToNextWave}`;

    playingScreen.update();

    if (lives === 0) {
      game.state = GameState.GAMEOVER;
    }
  }
}

window.addEventListener("load", () => {
  game.state = GameState.READY;
  readyScreen.addEventListeners();
});

animate();
