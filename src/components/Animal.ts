import {
  Assets,
  FederatedPointerEvent,
  Point,
  PointData,
  Rectangle,
  Ticker
} from 'pixi.js'
import { AtlasAttachmentLoader, SkeletonJson, Spine } from '@pixi/spine-pixi'

import { getRandomPoint } from '@/utils/random/getRandomPoint'
import { game } from '@/Game'

export class Animal extends Spine {
  private static readonly SPINE_PATH_WITHOUT_EXTENSION =
    'spines/jujabara_anims/jujabara_anims.'
  static readonly SPINE_SKELETON_PATH =
    this.SPINE_PATH_WITHOUT_EXTENSION + 'json'
  static readonly SPINE_ATLAS_PATH = this.SPINE_PATH_WITHOUT_EXTENSION + 'atlas'

  private readonly TRACK_INDEX = 0
  private readonly ANIMATION_NAME = 'idle_air'
  private readonly SPEED = 2
  // ToDo: it is better to create hitbox in the animation
  private readonly hitbox: Readonly<Rectangle> = new Rectangle(-44, -53, 81, 88)
  private readonly DRAGGING_Z_INDEX = 1
  private readonly ticker = new Ticker()
  private walkingDirection = getRandomPoint()

  constructor() {
    // TODO: @pixi/spine-pixi still hasn't a skeleton loader
    const attachmentLoader = new AtlasAttachmentLoader(
      Assets.get(Animal.SPINE_ATLAS_PATH)
    )
    const spineJsonParser = new SkeletonJson(attachmentLoader)

    super(
      spineJsonParser.readSkeletonData(Assets.get(Animal.SPINE_SKELETON_PATH))
    )

    this.scale.set(0.1)

    this.state.setAnimation(this.TRACK_INDEX, this.ANIMATION_NAME, true)

    this.ticker.add(this.updateWalking.bind(this))
    this.ticker.start()

    this.eventMode = 'static'
    this.onpointerdown = this.onPointerDown
    this.onpointerup = this.stopDragging
  }

  private updateWalking() {
    this.updatePosition()
    this.updateCollision()
  }

  private updatePosition() {
    this.position = this.position.add(
      this.walkingDirection
        .multiplyScalar(this.SPEED)
        .multiplyScalar(this.ticker.deltaTime)
    )
  }

  private updateCollision(fittedPosition?: Point) {
    const gameBounds = game.getBounds()
    const bounds = this.hitbox.clone()
    bounds.x += this.x
    bounds.y += this.y
    if (gameBounds.containsRect(bounds)) return

    if (fittedPosition) this.position.copyFrom(fittedPosition)
    else {
      const fittedBounds = bounds.fit(gameBounds)
      this.position.set(
        fittedBounds.x -
          this.hitbox.x +
          (fittedBounds.width - this.hitbox.width) / 2,
        fittedBounds.y -
          this.hitbox.y +
          (fittedBounds.height - this.hitbox.height) / 2
      )
      fittedPosition = this.position.clone()
    }

    this.walkingDirection = getRandomPoint()
    this.updatePosition()
    this.updateCollision(fittedPosition)
  }

  private onPointerDown(e: FederatedPointerEvent) {
    this.ticker.stop()
    this.zIndex = this.DRAGGING_Z_INDEX
    this.updateDragging(e)

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
