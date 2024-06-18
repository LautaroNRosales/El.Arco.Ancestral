// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() {
 
  }

  preload() {
   this.load.image("muro", "../public/assets/Muro.png");
   
   this.load.image("piso", "../public/assets/Piso2.png");
   this.load.image("tocon", "../public/assets/Tocon.png");
  }

  create() {
    this.addFondo();
    this.addPiso();
    this.addObjetos();
  }

  update() {
  
  }

  addFondo() {
    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;
    this.background = this.add.image(this.centerX, this.centerY, "muro");
    this.background.displayWidth = this.game.config.width;
    this.background.displayHeight = this.game.config.height;
  }

  addPiso() {
    this.pisos = this.physics.add.staticGroup();
    this.pisos.create(435, 545, "piso").setScale(0.35).refreshBody();
  }

  addObjetos() {
    
  }
}
