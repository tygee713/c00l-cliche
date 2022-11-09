import { init, Scene } from '../../lib/kontra.min.mjs'
import Friend from '../objects/friend.js'
import Player from '../objects/player.js'
import Sentence from '../objects/sentence.js'
import ThoughtBubble from '../objects/thoughtBubble.js'
import Words from '../objects/words.js'

const { canvas } = init()
let currentSentenceWords = []
let currentWords = []
let roundNumber = 0
let sentences = ['This is a test']
let filledInWords = []
let numCorrect = 0
const ignored = ['is', 'a']

// Gets the next sentence in the list and creates the word bank
// Called after the sentence is completed or the time runs out
const showNextSentence = () => {
  roundNumber++
  filledInWords = sentences[roundNumber].split(' ').map((word) => {
    return ignored.includes(word) ? word : ''
  })
  currentSentenceWords = Sentence(sentences[roundNumber])
  currentWords = Words(sentences[roundNumber])
}

// Determine if the filled in sentence is correct
// Called when all of the words are filled in
const completeSentence = () => {
  if (filledInWords.join(' ') == sentences[roundNumber]) {
    numCorrect++
  }

  showNextSentence()
}

// Changes the void in the sentence with the word that was selected
// Called when a void and a word are both selected
const fillInWord = (word, sentenceIndex, wordIndex) => {
  filledInWords[sentenceIndex] = word
  currentWords[wordIndex].hidden = true
}

// Removes a word from the selected void and returns it to the word bank
// Called when user presses an undo button
const clearWord = (sentenceIndex, wordIndex) => {
  filledInWords[sentenceIndex] = ""
  currentWords[wordIndex].hidden = false
}

const scene = Scene({
  id: 'main',
  objects: [Friend, Player, ThoughtBubble, ...currentSentenceWords, ...currentWords],
})

export default scene