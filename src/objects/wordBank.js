import { init, initPointer, Button } from '../../lib/kontra.min.mjs'

init()
initPointer()

const PIXELS_PER_LETTER = 7
// const sampleWords = ['This', 'test']
let xPosition = 400
let yPosition = 600

const createWords = (sampleWords, scene) => {
  xPosition = 400
  yPosition = 600
  
  return sampleWords.map((word, i) => {
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
        font: '16px Anonymous Pro',
        color: 'white',
        anchor: { x: 0.5, y: 0.5 },
      },
      onDown: function() {
        scene.selectedWordBankIndex = this.index
      },
      update: function() {
        if (scene.selectedWordBankIndex == this.index) {
          this.color = 'green'
        } else {
          this.color = 'black'
        }
      }
    })
  })
}

export default createWords