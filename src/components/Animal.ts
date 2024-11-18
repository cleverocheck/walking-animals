import { FederatedPointerEvent, Graphics, Ticker } from 'pixi.js'

import { getRandomPoint } from '@/utils/random/getRandomPoint'
import { game } from '@/Game'

export class Animal extends Graphics {
  private readonly SIZE = 50
  private readonly SPEED = 2
  private readonly DRAGGING_Z_INDEX = 1
  private readonly ticker = new Ticker()
  private walkingDirection = getRandomPoint()

  constructor(color: number) {
    super()

    this.draw(color)
    this.pivot.set(this.SIZE / 2)

    this.ticker.add(this.update.bind(this))
    this.ticker.start()

    this.eventMode = 'static'
    this.onpointerdown = this.onPointerDown
    this.onpointerup = this.stopDragging
  }

  private draw(color: number) {
    this.rect(0, 0, this.SIZE, this.SIZE).fill(color)
  }

  private update(ticker: Ticker) {
    this.position = this.position.add(
      this.walkingDirection
        .multiplyScalar(this.SPEED)
        .multiplyScalar(ticker.deltaTime)
    )

    const gameBounds = game.getBounds()
    const bounds = this.getBounds().rectangle
    if (!gameBounds.containsRect(bounds)) {
      const fittedBounds = bounds.fit(gameBounds)
      this.position.set(
        fittedBounds.x + fittedBounds.width / 2,
        fittedBounds.y + fittedBounds.height / 2
      )
      this.walkingDirection = getRandomPoint()
    }
  }

  private onPointerDown() {
    this.ticker.stop()
    this.zIndex = this.DRAGGING_Z_INDEX

    this.onglobalpointermove = this.updateDragging
    document.addEventListener('mouseleave', this.stopDragging)
    window.addEventListener('blur', this.stopDragging)
  }

  private updateDragging(e: FederatedPointerEvent) {
    this.position.set(e.globalX, e.globalY)
  }

  private readonly stopDragging = () => {
    this.ticker.start()
    this.zIndex = 0

    delete this.onglobalpointermove
    document.removeEventListener('mouseleave', this.stopDragging)
    window.removeEventListener('blur', this.stopDragging)
  }
}
