import { init, initPointer, Button } from '../../lib/kontra.min.mjs'

init()
initPointer()

let xPosition = 120
let yPosition = 738

const createWords = (options, scene) => {
  xPosition = options.length === 4 ? 260 : 140
  
  return options.sort(() => Math.random() - 0.5).map((word, i) => {
    if (i !== 0) xPosition += 136
    return Button({
      x: xPosition + 60,
      y: yPosition,
      width: 120,
      height: 47,
      color: '#E5E4E0',
      index: i,
      word,
      disabled: false,
      anchor: { x: 0.5, y: 0.5 },
      text: {
        text: word,
        font: 'bold 16px Anonymous Pro',
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