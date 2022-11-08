import { init, initPointer, Text, Button } from '../../lib/kontra.min.mjs'

init()
initPointer()

const sampleSentence = 'This is a test'
const PIXELS_PER_LETTER = 7
const ignored = ['is', 'a']
let xPosition = 300
let yPosition = 500

// if dynamic creation doesn't work, create a const file with an array of positions

let words = []

sampleSentence.split(" ").forEach((word, i) => {
  if (!ignored.includes(word)) {
    // render a box sprite with a width relative to # of chars in the word
    const wordObject = Button({
      x: xPosition,
      y: yPosition,
      width: (word.length + 1) * PIXELS_PER_LETTER,
      height: 16,
      color: 'black',
    })
    words.push(wordObject)
    xPosition += (word.length + 2) * PIXELS_PER_LETTER
  } else {
    words.push(Text({
      x: xPosition,
      y: yPosition,
      text: word,
      color: 'white',
      font: '16px Arial',
      textAlign: 'center',
    }))
    xPosition += (word.length + 1) * PIXELS_PER_LETTER
  }
  
})

export default words