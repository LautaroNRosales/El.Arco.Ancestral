export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() {
    this.gameStarted = false;
    this.puntos = 0;
    this.puntosText;
    this.velocidadObjetos = -200;
    this.aumentoVelocidad = -25;
    this.tiempoUltimoAumento = 0;
  }

  preload() {
    this.load.image("arboles", "./public/Arboles.png");
    this.load.image("piso", "./public/Piso2.png");
    this.load.image("tocon", "./public/Tocon.png");
    this.load.image("arco", "./public/Arco.png");
    this.load.image("tronco", "./public/Tronco.png");
    this.load.spritesheet("roca", "./public/Piedra-Sheet.png", {
      frameWidth: 400,
      frameHeight: 400,
    });
    this.load.spritesheet("personaje", "./public/Personaje-Sheet.png", {
      frameWidth: 320,
      frameHeight: 420,
    });
  }

  create() {
    this.addFondo();
    this.addPiso();
    this.addObstaculos();
    this.addPersonaje();
    this.addTeclas();
    this.addPuntos();
    this.tiempoUltimoAumento = this.time.now;
    this.createArcoEvent();
  }

  update(time, delta) {
    if (this.cursor.up.isDown && this.personaje.body.touching.down) {
      this.personaje.setVelocityY(-330);
    }

    if (this.gameStarted) {
      const tiempoActual = time;
      const tiempoTranscurrido = tiempoActual - this.tiempoUltimoAumento;

      if (tiempoTranscurrido > 500) {
        this.velocidadObjetos += this.aumentoVelocidad;
        this.tiempoUltimoAumento = tiempoActual;
        this.puntos += 10;
        this.puntosText.setText(`Puntos: ${this.puntos}`);
      }
    }

    this.moveFondo();
    this.movePiso();

    if (this.input.keyboard.checkDown(this.r, 500)) {
      this.scene.restart();
    }
  }

  addFondo() {
    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;
    this.background = this.add.tileSprite(this.centerX, this.centerY, this.game.config.width, this.game.config.height, "arboles");
    this.background.displayWidth = this.game.config.width;
    this.background.displayHeight = this.game.config.height;
  }

  moveFondo() {
    this.background.tilePositionX += 2; // Ajusta la velocidad del fondo
  }

  addPiso() {
    this.piso = this.add.tileSprite(750, 915, this.game.config.width, 325, "piso").setScale(1, 0.6);
    this.physics.add.existing(this.piso, true);
  }

  movePiso() {
    this.piso.tilePositionX += 5; // Ajusta la velocidad del piso
  }

  addObstaculos() {
    this.objetos = this.physics.add.group();
  }

  createObjetos() {
    if (!this.gameStarted) return;

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
  
    objeto.setVelocityX(this.velocidadObjetos);

    if (tipo === "tronco") {
      objeto.setScale(0.20);
    }

    this.physics.add.collider(this.personaje, this.objetos);
    objeto.setImmovable(true);
    objeto.body.allowGravity = false;
    this.physics.add.collider(this.roca, objeto, this.removeObject, null, this);
  }

  removeObject(roca, objeto) {
    objeto.destroy();
  }
  
  addPersonaje() {
    this.personaje = this.physics.add.sprite(450, 715, "personaje").setScale(0.5);
    this.personaje.setBounce(0.2);
    this.personaje.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("personaje", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "personaje", frame: 8 }],
      frameRate: 1
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("personaje", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.personaje.anims.play("right");
    this.physics.add.collider(this.personaje, this.piso);
  }

  addTeclas() {
    this.cursor = this.input.keyboard.createCursorKeys();
    this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  }

  addArco() {
    this.arco = this.physics.add.sprite(1570, 730, "arco").setScale(0.4);
    this.arco.setVelocityX(-200); // Mueve el arco hacia la izquierda
    this.physics.add.collider(this.arco, this.piso);
    this.physics.add.overlap(this.personaje, this.arco, this.collectArco, null, this);
  }

  collectArco(personaje, arco) {
    arco.disableBody(true, true);
    this.arcoEvent.remove(); // Detiene el evento del arco
    this.gameStarted = true; // Empieza el juego cuando el arco es recogido
    this.addRoca();
    this.addEventos();
    this.puntosText.visible = true;
  }

  createArcoEvent() {
    this.arcoEvent = this.time.addEvent({
      delay: 5000,
      callback: this.addArco,
      callbackScope: this,
      loop: true,
    });
  }

  addRoca() {
    this.roca = this.physics.add.sprite(50, 688, "roca").setScale(0.7);
    this.roca.setCollideWorldBounds(true);
    this.physics.add.collider(this.roca, this.piso);
    this.physics.add.collider(this.personaje, this.roca, this.handleCollision, null, this);
    this.roca.setImmovable(true);
    this.roca.body.allowGravity = false;
    this.roca.setVelocityX(0);
    this.roca.setX(0);
    this.anims.create({
      key: "rocaAnim",
      frames: this.anims.generateFrameNumbers("roca", { start: 0, end: 17 }), 
      frameRate: 10,
      repeat: -1
    });
    this.roca.anims.play("rocaAnim");
  }

  handleCollision(personaje, roca) {
    this.scene.start("End", { score: this.puntos, gameOver: true });
  }

  addEventos() {
    // Obstáculos
    this.time.addEvent({
      delay: 4000,
      callback: this.createObjetos,
      callbackScope: this,
      loop: true,
    });
  }

  addPuntos() {
    this.puntosText = this.add.text(16, 16, 'Puntos: 0', { fontSize: '32px', fill: '#000' });
    this.puntosText.visible = false;
  }
}
