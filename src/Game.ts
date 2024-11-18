import 'pixi.js/math-extras'
import 'reset-css'
import './index.css'

import { Application, Point, Rectangle } from 'pixi.js'

import { Animal } from '@/components/Animal'
import { getRandomHEXColor } from '@/utils/random/getRandomHEXColor'

class Game extends Application {
  private readonly ANIMALS_COUNT = 10

  getBounds() {
    return new Rectangle(
      0,
      0,
      game.canvas.width / this.renderer.resolution,
      game.canvas.height / this.renderer.resolution
    )
  }

  constructor() {
    super()

    this.init({ resolution: window.devicePixelRatio, resizeTo: window }).then(
      this.startGame.bind(this)
    )
  }

  private startGame() {
    this.spawnAnimals()
    this.show()
  }

  private spawnAnimals() {
    const bounds = this.getBounds()
    const defaultPosition = new Point(bounds.width / 2, bounds.height / 2)

    for (let i = 0; i < this.ANIMALS_COUNT; i++) {
      const animal = new Animal(getRandomHEXColor())
      animal.position = defaultPosition

      this.stage.addChild(animal)
    }
  }

  private show() {
    document.body.appendChild(this.canvas)
  }
}

export const game = new Game()
