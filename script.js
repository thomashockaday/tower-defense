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
function animate() {
  step++;
  requestAnimationFrame(animate);

  map.draw();

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();

    if (enemies[i].health <= 0) {
      enemies.splice(i, 1);
    }
  }

  for (let i = 0; i < towers.length; i++) {
    towers[i].update(step, enemies);

    for (let j = 0; j < towers[i].bullets.length; j++) {
      for (let k = 0; k < enemies.length; k++) {
        if (Collision.circleRect(towers[i].bullets[j], enemies[k])) {
          enemies[k].health -= 1;
          towers[i].bullets[j].finished = true;
        }
      }
    }
  }
}

animate();
