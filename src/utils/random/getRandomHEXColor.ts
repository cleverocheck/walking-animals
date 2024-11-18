const HEX_SIZE = 16777215

export function getRandomHEXColor() {
  return Math.floor(Math.random() * HEX_SIZE)
}
