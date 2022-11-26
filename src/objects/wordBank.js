import { init, initPointer, Button } from '../../lib/kontra.min.mjs'

init()
initPointer()

let xPosition = 100
let yPosition = 738

const createWords = (options, scene) => {
  xPosition = 100
  
  return options.map((word, i) => {
    if (i !== 0) xPosition += 180
    return Button({
      x: xPosition + 84,
      y: yPosition,
      width: 168,
      height: 47,
      color: '#E5E4E0',
      index: i,
      word,
      disabled: false,
      anchor: { x: 0.5, y: 0.5 },
      text: {
        text: word,
        font: 'bold 22px Anonymous Pro',
        color: '#392E2D',
        anchor: { x: 0.5, y: 0.5 },
      },
      onDown: function() {
        scene.selectedWordBankIndex = this.index
      },
      update: function() {
        if (scene.selectedWordBankIndex == this.index || this.hovered) {
          this.color = '#F37DB0'
        } else {
          this.color = '#E5E4E0'
        }
      }
    })
  })
}

export default createWords