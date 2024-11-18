import { Point } from 'pixi.js'

import { getRandomNumber } from '@/utils/random/getRandomNumber'

export function getRandomPoint() {
  const x = getRandomNumber(-1, 1),
    y = getRandomNumber(-1, 1)

  if (x === 0 && y === 0) return getRandomPoint()
  return new Point(x, y)
}
