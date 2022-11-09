import { init, initPointer, Text, Button } from '../../lib/kontra.min.mjs'

init()
initPointer()

const PIXELS_PER_LETTER = 7
const ignored = ['is', 'a']
let xPosition = 300
let yPosition = 500

// if dynamic creation doesn't work, create a const file with an array of positions

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
      })
    } else {
      return Text({
        x: xPosition += (word.length + 1) * PIXELS_PER_LETTER,
        y: yPosition,
        text: word,
        color: 'white',
        font: '16px Arial',
        textAlign: 'center',
      })
    }   
  })
}

export default createSentence