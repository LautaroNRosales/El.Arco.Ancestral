// Definición de la escena de inicio
export default class Start extends Phaser.Scene {
    constructor() {
      super("start");
    }
  
    preload() {
      this.load.image("backgroundImage", "./public/Arco.png");
    }
  
    create() {
      this.add.image(750, 400, "backgroundImage").setScale();
  
      this.add.text(750, 580, "Para comenzar toque 'S'", {
        fontSize: "32px",
        color: "#ffffff",
        align: "center",
      }).setOrigin(0.5);
  
      this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
  
    update() {
      if (this.sKey.isDown) {
        this.scene.start("main");
      }
    }
  }
  