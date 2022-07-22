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

let hoverTile = new HoverTile(
  {
    x: -1,
    y: -1,
  },
  map.tileSize
);

const enemies = [];

for (let i = 1; i <= 33; i += 2) {
  enemies.push(
    new Enemy(
      { x: -map.tileSize * i, y: firstPathTilePosition * map.tileSize },
      map.tileSize,
      map.tiles
    )
  );
}

let step = 0;
let animationFrame;
const game = new Game();

const readyScreen = new ReadyScreen(map);

const victoryText = new Text(
  { x: canvas.width / 2, y: canvas.height / 2 },
  "You win!",
  map.tileSize
);

const gameOverText = new Text(
  { x: canvas.width / 2, y: canvas.height / 2 },
  "Game Over",
  map.tileSize
);

function animate() {
  step++;
  animationFrame = requestAnimationFrame(animate);

  if (game.state === GameState.READY) {
    readyScreen.draw();
  }

  if (game.state === GameState.VICTORY) {
    victoryText.draw();
    canvas.removeEventListener("mousemove", playingMousemoveHandler);
    canvas.removeEventListener("click", playingClickHandler);
  }

  if (game.state === GameState.PLAYING) {
    map.draw();

    if (enemies.length === 0) {
      game.state = GameState.VICTORY;
    }

    for (let i = 0; i < enemies.length; i++) {
      enemies[i].update();

      if (enemies[i].position.x >= canvas.width) {
        enemies.splice(i, 1);
        lives--;
      }

      if (enemies[i].health <= 0) {
        score++;
        coins += enemies[i].coins;
        enemies.splice(i, 1);
      }
    }

    for (let i = 0; i < map.towers.length; i++) {
      map.towers[i].update(step, enemies);

      for (let j = 0; j < map.towers[i].bullets.length; j++) {
        for (let k = 0; k < enemies.length; k++) {
          if (Collision.circleRect(map.towers[i].bullets[j], enemies[k])) {
            enemies[k].health--;
            map.towers[i].bullets[j].finished = true;
          }
        }
      }
    }

    hoverTile.update();

    ctx.fillStyle = "white";
    ctx.font = `${map.tileSize / 2}px sans-serif`;
    ctx.textBaseline = "top";
    ctx.textAlign = "right";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 20, 20);
    ctx.fillText(`Score: ${score}`, canvas.width - 20, 60);
    ctx.fillText(`Coins: ${coins}`, canvas.width - 20, 100);

    if (lives === 0) {
      game.state = GameState.GAMEOVER;
    }
  }

  if (game.state === GameState.GAMEOVER) {
    gameOverText.draw();
    cancelAnimationFrame(animationFrame);
    canvas.removeEventListener("mousemove", playingMousemoveHandler);
    canvas.removeEventListener("click", playingClickHandler);
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
