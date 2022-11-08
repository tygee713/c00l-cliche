import { init, Scene } from '../../lib/kontra.min.mjs'
import Friend from '../objects/friend.js'
import Player from '../objects/player.js'
import Sentence from '../objects/sentence.js'
import ThoughtBubble from '../objects/thoughtBubble.js'
import Words from '../objects/words.js'

const { canvas } = init()
let currentSentence = []
let currentWords = []
let roundNumber = 0
let sentences = ["This is a test"]

// Gets the next sentence in the list and creates the word bank
// Called after the sentence is completed
const showNextSentence = () => {
  roundNumber++

  currentSentence = Sentence(sentences[roundNumber])
  currentWords = Words(sentences[roundNumber])
}

// Determine if the filled in sentence is correct
// Called when all of the words are filled in or the time runs out
const completeSentence = () => {
  
}

// Changes the void in the sentence with the word that was selected
// Called when a void and a word are both selected
const fillInWord = () => {

}

// Removes a word from the selected void and returns it to the word bank
// Called when user presses an undo button
const clearWord = () => {

}

const scene = Scene({
  id: 'main',
  objects: [Friend, Player, ThoughtBubble, ...currentSentence, ...currentWords],
})

export default scene