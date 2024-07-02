import Start from "./scenes/Start.js";
import Game from "./scenes/Game.js";
import End from "./scenes/End.js";


const config = {
  type: Phaser.AUTO,
  width: 1500,
  height: 1000,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200},
      debug: false,
    },
  },
  scene: [Start, Game, End],
};

window.game = new Phaser.Game(config);
