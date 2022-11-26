import { init, initPointer, Text, Button } from '../../lib/kontra.min.mjs'

init()
initPointer()

let xPosition = 152
let yPosition = 627

const createSentence = (sentence, scene) => {
  xPosition = 152

  parts = sentence.parts
  emptyPositions = sentence.emptyPositions

  return parts.map((word, i) => {
    if (emptyPositions.includes(i)) {
      return Button({
        x: xPosition += 186,
        y: yPosition,
        width: 170,
        height: 61,
        color: '#E5E4E0',
        index: i,
        disabled: false,
        word,
        text: {
          font: '22px Anonymous Pro',
          color: '#392E2D',
          anchor: { x: 0.5, y: 0.5 },
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
      return Text({
        x: xPosition += (word.length + 1) * PIXELS_PER_LETTER,
        y: yPosition,
        text: word,
        color: '#392E2D',
        font: '32px Anonymous Pro',
        textAlign: 'center',
        anchor: { x: 0.5, y: 0.5 },
      })
    }   
  })
}

export default createSentence