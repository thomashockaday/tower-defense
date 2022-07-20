const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const tileSize = 64;

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

canvas.width = tiles[0].length * tileSize;
canvas.height = tiles.length * tileSize;

function drawMap() {
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      ctx.fillStyle = tiles[i][j] === 0 ? "grey" : "black";
      ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
    }
  }
}

const firstPathTile = tiles.map((tile) => tile[0]);
const firstPathTilePosition = firstPathTile.indexOf(1);

const enemies = [
  new Enemy({
    x: -tileSize,
    y: firstPathTilePosition * tileSize,
  }),
  new Enemy({
    x: -tileSize * 3,
    y: firstPathTilePosition * tileSize,
  }),
];

const towers = [
  new Tower({
    x: tileSize * 5,
    y: tileSize * 4,
  }),
];

let step = 0;
function animate() {
  step++;
  requestAnimationFrame(animate);
  drawMap();

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
  }

  for (let i = 0; i < towers.length; i++) {
    towers[i].update(step);
  }
}

animate();
