import { init, initPointer, Button } from '../../lib/kontra.min.mjs'

init()
initPointer()

let xPosition = 150
let yPosition = 738

const createWords = (options, scene) => {
  xPosition = 150
  
  return options.map((word, i) => Button({
    x: xPosition += 180,
    y: yPosition,
    width: 168,
    height: 47,
    color: '#E5E4E0',
    index: i,
    word,
    text: {
      text: word,
      font: '22px Anonymous Pro',
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
  }))
}

export default createWords