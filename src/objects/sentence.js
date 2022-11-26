import { init, initPointer, Button, Text } from '../../lib/kontra.min.mjs'

init()
initPointer()

const PIXELS_PER_LETTER = 18
let xPosition = 152
let yPosition = 627

const createSentence = (sentence, scene) => {
  xPosition = 152

  let parts = sentence?.parts || []
  let emptyPositions = sentence?.emptyPositions || []

  return parts.map((word, i) => {
    if (emptyPositions.includes(i)) {
      let x = xPosition
      xPosition += 186
      return Button({
        x,
        y: yPosition,
        width: 170,
        height: 61,
        color: '#E5E4E0',
        index: i,
        disabled: false,
        word,
        text: {
          font: 'bold 22px Anonymous Pro',
          color: '#392E2D',
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
      xPosition += (word.length + 1) * PIXELS_PER_LETTER
      return Text({
        x,
        y: yPosition + 13,
        text: word,
        color: '#392E2D',
        font: 'bold 32px Anonymous Pro',
        textAlign: 'center',
      })
    }   
  })
}

export default createSentence