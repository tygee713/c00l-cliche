import { init, initPointer, Button } from '../../lib/kontra.min.mjs'
import MainScene from '../scenes/main.js'

init()
initPointer()

const PIXELS_PER_LETTER = 7
// const sampleWords = ['This', 'test']
let xPosition = 400
let yPosition = 600

const words = (sampleWords) => sampleWords.map((word, i) => {
  const x = xPosition
  xPosition += 100
  const width = (word.length + 1) * PIXELS_PER_LETTER
  const height = 16
  return Button({
    x: x + width / 2,
    y: yPosition + height / 2,
    width,
    height,
    color: 'black',
    anchor: { x: 0.5, y: 0.5 },
    index: i,
    hidden: false,
    word,
    text: {
      text: word,
      font: '16px Arial',
      color: 'white',
      anchor: { x: 0.5, y: 0.5 },
    },
    onDown: function() {
      MainScene.selectedWordBankIndex = this.index
    },
    update: function() {
      if (MainScene.selectedWordBankIndex == this.index) {
        this.color = 'green'
      } else {
        this.color = 'black'
      }
    }
  })
})

export default words