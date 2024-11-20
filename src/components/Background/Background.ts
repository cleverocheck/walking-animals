import { Assets, Sprite } from 'pixi.js'

import { game } from '@/Game'
import TEXTURE_PATH from './Background.texture.jpg'

export class Background extends Sprite {
  static readonly TEXTURE_PATH = TEXTURE_PATH

  private readonly textureAspectRatio

  constructor() {
    super(Assets.get(Background.TEXTURE_PATH))
    this.textureAspectRatio = this.texture.width / this.texture.height

    this.anchor.set(0.5)

    this.onResize()
    window.onresize = this.onResize.bind(this)
  }

  private onResize() {
    const gameBounds = game.getBounds()

    this.setSize(
      gameBounds.width,
      gameBounds.width * (1 / this.textureAspectRatio)
    )
    if (this.height < gameBounds.height)
      this.setSize(
        gameBounds.height * this.textureAspectRatio,
        gameBounds.height
      )
    this.position.set(gameBounds.width / 2, gameBounds.height / 2)
  }
}
