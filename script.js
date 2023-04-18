import BasicEnemy from "./Entities/Enemies/BasicEnemy";
import FastEnemy from "./Entities/Enemies/FastEnemy";
import StrongEnemy from "./Entities/Enemies/StrongEnemy";
import Game from "./Game";
import BasicLevel from "./Levels/BasicLevel";
import Map from "./Map";
import GameOverScreen from "./Screens/GameOverScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import PlayingScreen from "./Screens/PlayingScreen";
import ReadyScreen from "./Screens/ReadyScreen";
import VictoryScreen from "./Screens/VictoryScreen";
import Collision from "./Utils/Collision";
import Cursor from "./Utils/Cursor";
import Wave from "./Wave";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const level = new BasicLevel();
const map = new Map(level.tiles);
const cursor = new Cursor();

canvas.width = map.tiles[0].length * map.tileSize;
canvas.height = map.tiles.length * map.tileSize;

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
        { x: -map.tileSize * j, y: level.waypoints[0].y - map.tileSize / 2 },
        map.tileSize,
        level.waypoints
      )
    );
  }

  for (let j = 1; j <= 17; j += 2) {
    enemies.push(
      new FastEnemy(
        { x: -map.tileSize * j, y: level.waypoints[0].y - map.tileSize / 2 },
        map.tileSize,
        level.waypoints
      )
    );
  }

  for (let j = 1; j <= 9; j += 2) {
    enemies.push(
      new StrongEnemy(
        { x: -map.tileSize * j, y: level.waypoints[0].y - map.tileSize / 2 },
        map.tileSize,
        level.waypoints
      )
    );
  }

  waves.push(new Wave(enemies));
}

let step = 0;
let animationFrame;

const gameOverScreen = new GameOverScreen(map, canvas, cursor);
const loadingScreen = new LoadingScreen(map, canvas, cursor);
const playingScreen = new PlayingScreen(map, canvas, cursor);
const readyScreen = new ReadyScreen(map, canvas, cursor);
const victoryScreen = new VictoryScreen(map, canvas, cursor);

const game = new Game(loadingScreen);

function animate() {
  step++;
  animationFrame = requestAnimationFrame(animate);

  if (readyScreen.finished && game.screen === readyScreen) {
    game.screen = playingScreen;
    playingScreen.active = true;
  }

  if (game.screen === playingScreen) {
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

    if (cursor.clicking) {
      const tower = new BasicTower(
        {
          x: playingScreen.hoverTile.position.x,
          y: playingScreen.hoverTile.position.y,
        },
        map.tileSize,
        map.tileSize
      );

      if (
        map.canPlaceTower(playingScreen.hoverTile.currentTile) &&
        coins >= tower.cost
      ) {
        map.tiles[playingScreen.hoverTile.currentTile.y][
          playingScreen.hoverTile.currentTile.x
        ] = 9;
        map.towers.push(tower);
        coins -= tower.cost;
      }
      cursor.clicking = false;
    }

    for (let i = 0; i < map.towers.length; i++) {
      map.towers[i].update(step, waves[wave].enemies);

      for (let j = 0; j < map.towers[i].bullets.length; j++) {
        if (
          map.towers[i].bullets[j].position.x > canvas.width ||
          map.towers[i].bullets[j].position.x +
            map.towers[i].bullets[j].radius <
            0 ||
          map.towers[i].bullets[j].position.y < 0 ||
          map.towers[i].bullets[j].position.y +
            map.towers[i].bullets[j].radius >
            canvas.height
        ) {
          map.towers[i].bullets[j].finished = true;
        }

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

          if (waves[wave].enemies[k].health <= 0) {
            score++;
            coins += waves[wave].enemies[k].coins;
            waves[wave].enemies.splice(k, 1);
            continue;
          }

          if (Collision.rectRect(waves[wave].enemies[k], map.goal)) {
            waves[wave].enemies.splice(k, 1);
            lives--;
            continue;
          }
        }
      }
    }

    playingScreen.topbar.waveText.text = `Wave: ${wave + 1}`;
    playingScreen.topbar.livesText.text = `Lives: ${lives}`;
    playingScreen.topbar.scoreText.text = `Score: ${score}`;
    playingScreen.topbar.coinsText.text = `Coins: ${coins}`;

    playingScreen.topbar.countdownToNextWaveText.text = `Next: ${Math.floor(
      countdownToNextWave / 60
    )}`;

    if (lives === 0) {
      game.screen = gameOverScreen;
    }
  }

  game.screen.update();

  map.draw(ctx);

  map.towers.forEach((tower) => {
    tower.draw(ctx);
  });

  waves.forEach((wave) => {
    wave.draw(ctx);
  });

  game.screen.draw(ctx);
}

window.addEventListener("load", () => {
  game.screen = readyScreen;
});

canvas.addEventListener("mousemove", (e) => {
  cursor.position = {
    x: e.layerX,
    y: e.layerY,
  };
});

canvas.addEventListener("touchstart", () => {
  cursor.clicking = true;
});

canvas.addEventListener("mousedown", () => {
  cursor.clicking = true;
});

canvas.addEventListener("mouseup", () => {
  cursor.clicking = false;
});

canvas.addEventListener("touchend", () => {
  cursor.clicking = false;
});

animate();
