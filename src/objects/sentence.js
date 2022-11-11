import { init, initPointer, Text, Button } from '../../lib/kontra.min.mjs'
import MainScene from '../scenes/main.js'

init()
initPointer()

const PIXELS_PER_LETTER = 7
const ignored = ['is', 'a']
let xPosition = 300
let yPosition = 500

const createSentence = (sentence) => {
  return sentence.split(' ').map((word, i) => {
    if (!ignored.includes(word)) {
      // render a box sprite with a width relative to # of chars in the word
      return Button({
        x: xPosition += (word.length + 2) * PIXELS_PER_LETTER,
        y: yPosition,
        width: (word.length + 1) * PIXELS_PER_LETTER,
        height: 16,
        color: 'black',
        index: i,
        disabled: false,
        word,
        anchor: { x: 0.5, y: 0.5 },
        text: {
          font: '16px Arial',
          color: 'white',
          anchor: { x: 0.5, y: 0.5 },
        },
        onDown: function() {
          if (!this.disabled) {
            MainScene.selectedSentenceWordIndex = this.index
          }
        },
        update: function() {
          let selectedSentenceWordIndex = MainScene.selectedSentenceWordIndex
          if (selectedSentenceWordIndex == this.index) {
            this.color = 'green'
          } else {
            this.color = 'black'
          }

          let selectedWordIndex = MainScene.selectedWordBankIndex
          // if any words in the word bank are selected, call fillInWord
          if (selectedSentenceWordIndex == this.index && selectedWordIndex !== null) {
            let word = MainScene.currentWords[selectedWordIndex].word
            MainScene.fillInWord(word, selectedSentenceWordIndex, selectedWordIndex)
          }
        }
      })
    } else {
      return Text({
        x: xPosition += (word.length + 1) * PIXELS_PER_LETTER,
        y: yPosition,
        text: word,
        color: 'white',
        font: '16px Arial',
        textAlign: 'center',
        anchor: { x: 0.5, y: 0.5 },
      })
    }   
  })
}

export default createSentence