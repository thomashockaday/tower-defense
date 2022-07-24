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

let wave = 1;
let waves = [new Wave([])];

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

let hoverTile = new HoverTile(
  {
    x: -1,
    y: -1,
  },
  map.tileSize
);

const waveText = new Text(
  { x: canvas.width - 20, y: 20 },
  `Wave: ${wave}`,
  map.tileSize / 2,
  "top",
  "right"
);

const livesText = new Text(
  { x: canvas.width - 20, y: 60 },
  `Lives: ${lives}`,
  map.tileSize / 2,
  "top",
  "right"
);

const scoreText = new Text(
  { x: canvas.width - 20, y: 100 },
  `Score: ${score}`,
  map.tileSize / 2,
  "top",
  "right"
);

const coinsText = new Text(
  { x: canvas.width - 20, y: 140 },
  `Coins: ${coins}`,
  map.tileSize / 2,
  "top",
  "right"
);

let step = 0;
let animationFrame;
const game = new Game();

const gameOverScreen = new GameOverScreen(map);
const readyScreen = new ReadyScreen(map);
const victoryScreen = new VictoryScreen(map);

function animate() {
  step++;
  animationFrame = requestAnimationFrame(animate);

  if (readyScreen.finished && game.state === GameState.READY) {
    game.state = GameState.PLAYING;
  }

  if (game.state === GameState.READY) {
    readyScreen.draw();
  }

  if (game.state === GameState.GAMEOVER) {
    gameOverScreen.draw();
    cancelAnimationFrame(animationFrame);
    canvas.removeEventListener("mousemove", playingMousemoveHandler);
    canvas.removeEventListener("click", playingClickHandler);
    return;
  }

  if (game.state === GameState.VICTORY) {
    victoryScreen.draw();
    canvas.removeEventListener("mousemove", playingMousemoveHandler);
    canvas.removeEventListener("click", playingClickHandler);
  }

  if (game.state === GameState.PLAYING) {
    map.draw();

    if (waves[wave].enemies.length === 0) {
      waves[wave].finished = true;
      wave++;

      if (wave >= waves.length) {
        game.state = GameState.VICTORY;
        return;
      } else {
        waves[wave].started = true;
      }
    }

    for (let i = 0; i < waves[wave].enemies.length; i++) {
      waves[wave].enemies[i].update();

      if (waves[wave].enemies[i].position.x >= canvas.width) {
        waves[wave].enemies.splice(i, 1);
        lives--;
      }

      if (waves[wave].enemies[i].health <= 0) {
        score++;
        coins += waves[wave].enemies[i].coins;
        waves[wave].enemies.splice(i, 1);
      }
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

    hoverTile.update();

    waveText.text = `Wave: ${wave}`;
    livesText.text = `Lives: ${lives}`;
    scoreText.text = `Score: ${score}`;
    coinsText.text = `Coins: ${coins}`;

    waveText.draw();
    livesText.draw();
    scoreText.draw();
    coinsText.draw();

    if (lives === 0) {
      game.state = GameState.GAMEOVER;
    }
  }
}

const playingMousemoveHandler = (e) => {
  hoverTile.position = {
    x: Math.floor(e.clientX / map.tileSize) * map.tileSize,
    y: Math.floor(e.clientY / map.tileSize) * map.tileSize,
  };
};

const playingClickHandler = () => {
  const tower = new Tower(
    {
      x: hoverTile.position.x,
      y: hoverTile.position.y,
    },
    map.tileSize,
    map.tileSize,
    5
  );

  if (map.canPlaceTower(hoverTile.currentTile) && coins >= tower.cost) {
    map.tiles[hoverTile.currentTile.y][hoverTile.currentTile.x] = 2;
    map.towers.push(tower);
    coins -= tower.cost;
  }
};

window.addEventListener("load", () => {
  game.state = GameState.READY;
});

animate();
