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
   this.load.image("personaje", "../public/assets/Finn.png")
  }

  create() {
    this.addFondo();
    this.addPiso();
    this.addTocon();
    this.addPersonaje();
    this.addTeclas();
  }

  update() {
  if (this.cursor.left.isDown) {
    this.personaje.setVelocityX(-160);
  } else if (this.cursor.right.isDown) {
    this.personaje.setVelocityX(160);
  } else {
    this.personaje.setVelocityX(0);
  }
  if (this.cursor.up.isDown && this.personaje.body.touching.down) {
    this.personaje.setVelocityY(-330)
  }
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

  addTocon() {
    this.tocones = this.physics.add.group();
    const tocon = this.tocones.create(850, 428, "tocon").setScale(0.25);
    this.physics.add.collider(this.tocones, this.pisos);
    this.time.addEvent({
      delay: 5000,
      callback: this.createTocon,
      callbackScope: this,
      loop: true
    })
  }

  createTocon() {
    const x = 850;
    const y = 439;
    const tocon = this.tocones.create(x, y, "tocon");
    tocon.setScale(0.25).refreshBody();
    tocon.setVelocityX(-200);
    tocon.setImmovable(true);
    tocon.body.allowGravity = false;
    this.physics.add.collider(this.personaje, this.tocones);
  }
  
  addPersonaje() {
    this.personaje = this.physics.add.sprite(100, 100, "personaje");
    this.personaje.setScale(0.1);
    //this.personaje.body.setSize(1000,1000,0,100)
    this.personaje.setCollideWorldBounds(true);
    this.physics.add.collider(this.personaje, this.pisos);
  }

  addTeclas() {
    this.cursor = this.input.keyboard.createCursorKeys();
  }
}
