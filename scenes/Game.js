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
    this.addObjetos();
    this.addPersonaje();
    this.addTeclas();
   
    this.time.addEvent({
      delay: 3000,
      callback: this.addObjetos,
      callbackScope: this,
      loop: true,
    });
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

  addObjetos() {
    this.objetogrupo = this.physics.add.group();
    const objeto = this.physics.add.sprite(700, 400, "tocon").setScale(0.3);
    this.physics.add.collider(this.objetogrupo, this.pisos);
    this.physics.add.collider(this.objetogrupo, this.personaje);

this.objetogrupo.add(objeto);
    
this.objetogrupo.setVelocityX(-100)
  

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
