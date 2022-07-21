const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const tiles = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
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

const enemies = [
  new Enemy(
    {
      x: -map.tileSize,
      y: firstPathTilePosition * map.tileSize,
    },
    map
  ),
  new Enemy(
    {
      x: -map.tileSize * 3,
      y: firstPathTilePosition * map.tileSize,
    },
    map
  ),
  new Enemy(
    {
      x: -map.tileSize * 5,
      y: firstPathTilePosition * map.tileSize,
    },
    map
  ),
  new Enemy(
    {
      x: -map.tileSize * 7,
      y: firstPathTilePosition * map.tileSize,
    },
    map
  ),
  new Enemy(
    {
      x: -map.tileSize * 9,
      y: firstPathTilePosition * map.tileSize,
    },
    map
  ),
  new Enemy(
    {
      x: -map.tileSize * 11,
      y: firstPathTilePosition * map.tileSize,
    },
    map
  ),
];

const towers = [
  new Tower(
    {
      x: map.tileSize * 5,
      y: map.tileSize * 4,
    },
    map.tileSize,
    map.tileSize,
    5
  ),
  new Tower(
    {
      x: map.tileSize * 5,
      y: map.tileSize * 8,
    },
    map.tileSize,
    map.tileSize,
    10
  ),
];

let step = 0;
let animationFrame;

function animate() {
  step++;
  animationFrame = requestAnimationFrame(animate);

  map.draw();

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();

    if (enemies[i].health <= 0) {
      enemies.splice(i, 1);
      score++;
    }

    if (enemies[i].position.x >= canvas.width) {
      enemies.splice(i, 1);
      lives--;
    }
  }

  for (let i = 0; i < towers.length; i++) {
    towers[i].update(step, enemies);

    for (let j = 0; j < towers[i].bullets.length; j++) {
      for (let k = 0; k < enemies.length; k++) {
        if (Collision.circleRect(towers[i].bullets[j], enemies[k])) {
          enemies[k].health--;
          towers[i].bullets[j].finished = true;
        }
      }
    }
  }

  ctx.fillStyle = "white";
  ctx.font = `${map.tileSize / 2}px sans-serif`;
  ctx.textBaseline = "top";
  ctx.textAlign = "right";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 20, 20);
  ctx.fillText(`Score: ${score}`, canvas.width - 20, 60);

  if (lives === 0) {
    ctx.font = `${map.tileSize}px sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    cancelAnimationFrame(animationFrame);
  }
}

animate();
