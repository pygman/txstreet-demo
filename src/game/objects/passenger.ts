import { ISpriteConstructor } from '../interfaces/sprite.interface';
import {TxStreetContainer} from "../../hooks/txStreetContainer";

/*
export const passengerTypes: string[] = [
  'alien-', 'moonboy-', 'person-11', 'person-12', 'person-13', 'person-14', 'person-15', 'person-1', 'person-2', 'person-3', 'person-',
  'isabella-', 'mib-', 'person-10', 'person-4', 'person-5', 'person-6', 'person-7', 'person-8', 'person-9', 'helper-',
  'santa-', 'snowman-', 'frog-', 'mailman-', 'bull-', 'wolf-', 'bear-', 'lion-', 'mailman-', 'monkey-', 'penguin-', 'lizard-', 'bat-', 'unicorn-',
]
 */

export const passengerTypes: string[] = [
  'alien', 'moonboy',
  'isabella', 'mib', 'helper',
  'santa', 'snowman', 'frog', 'mailman', 'bull', 'wolf', 'bear', 'lion', 'mailman', 'monkey', 'penguin', 'lizard', 'bat', 'unicorn',
]

export class Passenger extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body;

  // variables
  private currentScene: Phaser.Scene;
  private target!: { x: number, y: number};
  private walkingSpeed!: number;
  private idleLock!: boolean;
  private passengerType!: string;
  private idleFrameName!: string;

  // input
  private keys!: Map<string, Phaser.Input.Keyboard.Key>;

  public getKeys(): Map<string, Phaser.Input.Keyboard.Key> {
    return this.keys;
  }

  constructor(aParams: ISpriteConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    this.currentScene = aParams.scene;
    this.initSprite();
    this.currentScene.add.existing(this);
  }

  private initSprite() {
    // variables
    this.passengerType = passengerTypes[Math.floor(Math.random() * passengerTypes.length)]
    this.walkingSpeed = 80;
    this.idleLock = false;

    // sprite
    this.setOrigin(0.5, 0.5);
    this.setFlipX(false);

    // physics
    this.currentScene.physics.world.enable(this);
    // this.body.setSize(6, 12);
    // this.body.setOffset(6, 4);

    // event
    this.setInteractive();
    this.on('pointerover', this.onOver);
    this.on('pointerout', this.onOut);
    this.on('pointerdown', this.onClick);
  }

  private onOver() {
    window.document.body.style.cursor='pointer';
  }

  private onOut() {
    window.document.body.style.cursor='';
  }

  private onClick(pointer: any) {
    window.clientX = pointer.event.clientX;
    window.clientY = pointer.event.clientY;
    window.showWin(this.passengerType);
    console.log(`onClick ${window.clientX} ${window.clientY} ${this.passengerType}`);
  }

  update(): void {
    this.handleWalking();
    this.handleAnimations();
  }

  private handleWalking() {
    if (!this.target) {
      this.moveToRandom();
      this.anims.play(`${this.passengerType}WalkDown`, true);
    } else if ((this.body.velocity.x > 0 && this.x >= this.target.x || this.body.velocity.x < 0 && this.x <= this.target.x) &&
      (this.body.velocity.y > 0 && this.y >= this.target.y || this.body.velocity.y < 0 && this.y <= this.target.y)) {
      if (!this.idleLock) {
        this.idleLock = true;
        this.body.setVelocity(0, 0);
        setTimeout(() => {
          this.moveToRandom();
          this.idleLock = false;
        }, 2000);
      }
    }
  }

  private moveToRandom() {
    const x = Math.round(Math.random() * this.scene.sys.canvas.width);
    const y = Math.round(Math.random() * this.scene.sys.canvas.height);
    this.target = {x, y};
    // console.log(`move to ${x} ${y}`)
    if (this.x === this.target.x) {
      this.body.setVelocityY(this.target.y > this.y ? this.walkingSpeed : -this.walkingSpeed);
    } else if (this.y === this.target.y) {
      this.body.setVelocityX(this.target.x > this.x ? this.walkingSpeed : -this.walkingSpeed);
    } else {
      const a = (this.target.y - this.y) / (this.target.x - this.x);
      const speedXAbs = Math.sqrt(this.walkingSpeed * this.walkingSpeed / (1 + a * a));
      const speedX = this.target.x > this.x ? speedXAbs : -speedXAbs;
      const speedY = a * speedX;
      this.body.setVelocity(speedX, speedY);
      if (speedX < 0 && -speedX >= Math.abs(speedY)) {
        this.idleFrameName = this.passengerType + '-6.png';
      } else if (speedX > 0 && speedX >= Math.abs(speedY)) {
        this.idleFrameName = this.passengerType + '-6.png';
      } else if (speedY > 0 && speedY >= Math.abs(speedX)) {
        this.idleFrameName = this.passengerType + '-0.png';
      } else if (speedY < 0 && -speedY > Math.abs(speedX)) {
        this.idleFrameName = this.passengerType + '-3.png';
      }
      // console.log(`setVelocity ${speedX} ${speedY} ${speedX * speedX + speedY * speedY}`)
    }
  }

  private handleAnimations(): void {
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      this.setFrame(this.idleFrameName);
    }
    if (this.body.velocity.x < 0 && -this.body.velocity.x >= Math.abs(this.body.velocity.y)) {
      this.setFlipX(false);
      this.anims.play(`${this.passengerType}Walk`, true);
    } else if (this.body.velocity.x > 0 && this.body.velocity.x >= Math.abs(this.body.velocity.y)) {
      this.setFlipX(true);
      this.anims.play(`${this.passengerType}Walk`, true);
    } else if (this.body.velocity.y > 0 && this.body.velocity.y >= Math.abs(this.body.velocity.x)) {
      this.anims.play(`${this.passengerType}WalkDown`, true);
    } else if (this.body.velocity.y < 0 && -this.body.velocity.y > Math.abs(this.body.velocity.x)) {
      this.anims.play(`${this.passengerType}WalkUp`, true);
    }
  }

}
