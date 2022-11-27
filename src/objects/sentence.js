import { init, initPointer, Button, Text } from '../../lib/kontra.min.mjs'

init()
initPointer()

const PIXELS_PER_LETTER = 18
let xPosition = 0

const createSentence = (sentence, scene) => {
  xPosition = 0

  let parts = sentence?.parts || []
  let emptyPositions = sentence?.emptyPositions || []

  return parts.map((word, i) => {
    if (emptyPositions.includes(i)) {
      let x = xPosition
      xPosition += 181
      return Button({
        x,
        width: 170,
        height: 55,
        color: '#E5E4E0',
        index: i,
        disabled: false,
        word,
        anchor: { x: 0, y: 0.5 },
        text: {
          x: 85,
          font: 'bold 24px Anonymous Pro',
          color: '#392E2D',
          anchor: { x: 0.5, y: 0.5 }
        },
        onDown: function() {
          if (!this.disabled) {
            scene.selectedSentenceWordIndex = this.index
          }
        },
        update: function() {
          let selectedSentenceWordIndex = scene.selectedSentenceWordIndex
          if (selectedSentenceWordIndex == this.index) {
            this.color = '#F37DB0'
          } else {
            this.color = '#E5E4E0'
          }

          let selectedWordIndex = scene.selectedWordBankIndex
          // if any words in the word bank are selected, call fillInWord
          if (selectedSentenceWordIndex == this.index && selectedWordIndex !== null) {
            let word = scene.currentWords[selectedWordIndex].word
            scene.fillInWord(word, selectedSentenceWordIndex, selectedWordIndex)
          }
        }
      })
    } else {
      let x = xPosition
      let text = Text({
        x,
        text: word,
        color: '#392E2D',
        font: 'bold 24px Anonymous Pro',
        textAlign: 'center',
        anchor: { x: 0, y: 0.5 }
      })
      xPosition += text.width + 16
      return text
    }   
  })
}

export default createSentence