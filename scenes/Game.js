// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() {
 
  }

  preload() {
   this.load.image("fondo", "../public/assets/Fondo.png");
   
   this.load.image("piso", "../public/assets/Piso2.png");
   this.load.image("tocon", "../public/assets/Tocon.png")
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
    this.background = this.add.image(this.centerX, this.centerY, "fondo");
    this.background.displayWidth = this.game.config.width;
    this.background.displayHeight = this.game.config.height;
  }

  addPiso() {
    this.pisos = this.physics.add.staticGroup();
    this.pisos.create(420, 545, "piso").setScale(3.4).refreshBody();
  }

  addObjetos() {
    
  }
}
