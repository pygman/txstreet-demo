export interface ISpriteConstructor {
  name?: string;
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
}
