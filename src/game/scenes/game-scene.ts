import { Passenger } from "../objects/passenger";

export class GameScene extends Phaser.Scene {
  private passengers!: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {
    console.log('init');
    this.passengers = this.add.group({ runChildUpdate: true });
  }

  create(): void {
    for (let i = 0; i < 20; i++) {
      const x = Math.round(Math.random() * this.sys.canvas.width);
      const y = Math.round(Math.random() * this.sys.canvas.height);
      this.passengers.add(
        new Passenger({
          scene: this,
          x,
          y,
          texture: 'characters',
          frame: 'alien-0.png'
        })
      );
    }
  }

  update(): void {
    this.passengers.children.each((gameObject: Phaser.GameObjects.GameObject) => {
      const passenger: Passenger = gameObject as Passenger;
      passenger.update();
    }, this);
  }

}
