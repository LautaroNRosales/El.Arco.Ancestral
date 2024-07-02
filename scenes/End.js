export default class End extends Phaser.Scene {
    constructor() {
      super("End");
    }
  
    init(data) {
      this.score = data.score || 0;
      this.gameOver = data.gameOver || true;
    }
  
    create() {
      // Mostrar el texto "Game Over" y puntaje
      this.add.text(750, 450, "Game Over", {
        fontSize: "80px",
        color: "#ffffff",
      }).setOrigin();
  
      this.add.text(750, 500, `Score: ${this.score}`, {
        fontSize: "40px",
        color: "#ffffff",
      }).setOrigin();
  
      // Mostrar mensaje para reiniciar con la tecla "r"
      this.add.text(750, 550, "Presiona 'R' para reiniciar el juego", {
        fontSize: "40px",
        color: "#ffffff",
      }).setOrigin();
  
      // Capturar la tecla "r" para reiniciar el juego
      this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
  
    update() {
      // Reiniciar el juego si se presiona la tecla "r"
      if (this.rKey.isDown) {
        this.scene.start("main");
      }
    }
  }