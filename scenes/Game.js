// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
    this.backgroundVelocity = -2;
  }

  init() {
 
  }

  preload() {
   this.load.image("arboles", "./public/Arboles.png");
   this.load.image("montanas", "./public/Montañas.png");
   this.load.image("piso", "./public/Piso2.png");
   this.load.image("tocon", "./public/Tocon.png");
   this.load.image("personaje", "./public/Finn.png");
   this.load.image("tronco", "./public/Tronco.png");
   this.load.image("soporte", "./public/Soporte.png");
   this.load.spritesheet("roca", "./public/Piedra-Sheet.png", {
    frameWidth: 400,
    frameHeight: 400,
   });
  }

  create() {
    this.addFondo();
    this.addPiso();
    this.addObstaculos();
    this.addPersonaje();
    this.addTeclas();
    this.addEventos();
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

  this.moveFondo();
  this.movePiso();
  }

  addFondo() {
    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;
    this.background = this.add.tileSprite(this.centerX, this.centerY, this.game.config.width, this.game.config.height, "arboles");
    this.background.displayWidth = this.game.config.width;
    this.background.displayHeight = this.game.config.height;
  }

  moveFondo() {
    this.background.tilePositionX -= this.backgroundVelocity;
  }

  addPiso() {
    this.piso = this.add.tileSprite(750, 915, this.game.config.width, 325, "piso").setScale(1, 0.6);
    this.physics.add.existing(this.piso, true);
    //this.piso.body.setSize(1500, 199);
  }

  movePiso() {
    this.piso.tilePositionX += 2; // Ajusta este valor para cambiar la velocidad del piso
  }

  addObstaculos() {
    this.objetos = this.physics.add.group();
  }

  createObjetos() {
    const tipos = ["tocon", "tronco"];

    const tipo = Phaser.Math.RND.pick(tipos);
  
    let yPos = 749; // Coordenada 'y' por defecto

    if (tipo === "tronco") {
      yPos = 773; // Ajusta este valor para la coordenada 'y' del tronco
    }

    let objeto = this.objetos.create(
      1570, // Coordenada 'x'
      yPos, // Coordenada 'y'
      tipo
    ).setScale(0.35);
  
    objeto.setVelocityX(-200);

    if (tipo === "tronco") {
      objeto.setScale(0.20);
    }

   this.physics.add.collider(this.personaje, this.objetos);
    objeto.setImmovable(true);
    objeto.body.allowGravity = false;
  }
  
  addPersonaje() {
    this.personaje = this.physics.add.sprite(100, 100, "personaje");
    this.personaje.setScale(0.15);
    //this.personaje.body.setSize(1000,1000,0,100)
    this.personaje.setCollideWorldBounds(true);
    this.physics.add.collider(this.personaje, this.piso);
  }

  addTeclas() {
    this.cursor = this.input.keyboard.createCursorKeys();
  }

  addEventos() {
    //obstaculos
    this.time.addEvent({
      delay: 5000,
      callback: this.createObjetos,
      callbackScope: this,
      loop: true,
    });
  }
}
