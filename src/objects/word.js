import { init, initPointer, Button } from '../../lib/kontra.min.mjs'
const PIXELS_PER_LETTER = 7

init()
initPointer()

export const createWord = (string, x, y) => {
  const width = (string.length + 1) * PIXELS_PER_LETTER
  const height = 16
  return Button({
    x: x + width / 2,
    y: y + height / 2,
    width,
    height,
    color: 'black',
    anchor: { x: 0.5, y: 0.5 },
    text: {
      text: string,
      font: '16px Arial',
      color: 'white',
      anchor: { x: 0.5, y: 0.5 },
    },
  })
}

export default createWord