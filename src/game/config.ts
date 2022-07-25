import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'txstreet demo',
  url: 'https://github.com/pygman/txstreet-demo',
  version: '1.0',
  width: 1200,
  height: 800,
  zoom: 1,
  type: Phaser.AUTO,
  parent: window.document.body,
  scene: [BootScene, GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  backgroundColor: '#f5cc69',
  render: { pixelArt: true, antialias: false },
  canvasStyle: 'position: fixed; left: 0px; top: 63px;'
};
