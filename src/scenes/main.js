import { init, initPointer, Button, Scene, Sprite } from '../../lib/kontra.min.mjs'
import Friend from '../objects/friend.js'
import Player from '../objects/player.js'
import SpeechBubble from '../objects/speechBubble.js'
import ThoughtBubble from '../objects/thoughtBubble.js'
import createSentence from '../objects/sentence.js'
import createWords from '../objects/wordBank.js'
import { showEndScene } from '../game.js'
import { sentences } from '../const.js'

const { canvas } = init()
initPointer()

const background = Sprite({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height
})

let image = new Image()
image.src = 'assets/background.png'
image.onload = function() {
  background.image = image
}

//TODO: Remove outside of test env
const endButton = Button({
  x: canvas.width,
  y: canvas.height,
  width: 293,
  height: 66,
  anchor: { x: 1, y: 1 },
  color: '#83C80B',
  text: {
    text: 'END GAME',
    color: '#392E2D',
    font: '48px Anonymous Pro',
    textAlign: 'center',
    anchor: { x: 0.5, y: 0.5 },
  },
  onDown: function() {
    this.color = '#F37DB0'
  },
  onUp: function() {
    this.color = '#83C80B'
    showEndScene()
  }
})

const createScene = () => Scene({
  id: 'main',
  objects: [background, Friend, Player, SpeechBubble, ThoughtBubble, endButton],
  currentSentenceWords: [],
  currentWords: [],
  roundNumber: 0,
  filledInWords: [],
  numCorrect: 0,
  numIncorrect: 0,
  timeLeft: 20,
  selectedSentenceWordIndex: null,
  selectedWordBankIndex: null,
  onShow: function() {
    this.showNextSentence()
  },
  resetScene: function() {
    this.currentSentenceWords = []
    this.currentWords = []
    this.roundNumber = 0
    this.filledInWords = []
    this.numCorrect = 0
    this.numIncorrect = 0
    this.timeLeft = 20
    this.selectedSentenceWordIndex = null
    this.selectedWordBankIndex = null
  },
  showNextSentence: function() {
    // Gets the next sentence in the list and creates the word bank
    // Called after the sentence is completed or the time runs out
    this.remove(this.currentSentenceWords)
    this.remove(this.currentWords)

    let sentence = sentences[this.roundNumber]
    sentence.parts.forEach((part, i) => {
      if (sentence.emptyPositions.includes(i)) {
        this.filledInWords[i] = ''
      } else {
        this.filledInWords[i] = part
      }
    })
    this.currentSentenceWords = createSentence(sentence, this)
    this.currentWords = createWords(sentence.options, this)
    this.add([...this.currentSentenceWords, ...this.currentWords])
  },
  completeSentence: function() {
    // Determine if the filled in sentence is correct
    // Called when all of the words are filled in
    if (this.filledInWords.join(' ') == sentences[this.roundNumber].parts.join(' ').toLowerCase) {
      this.numCorrect++
      this.timeLeft += 5
    } else {
      this.numIncorrect++
    }
    
    if (this.roundNumber < sentences.length - 1) {
      this.roundNumber++
      this.showNextSentence()
    } else {
      showEndScene()
    }
  },
  fillInWord: function(word, sentenceIndex, wordIndex) {
    // Changes the void in the sentence with the word that was selected
    // Called when a void and a word are both selected
    this.filledInWords[sentenceIndex] = word

    // TODO: figure out how to hide button completely
    this.currentWords[wordIndex].opacity = 0
  
    // De-select all words
    this.selectedSentenceWordIndex = null
    this.selectedWordBankIndex = null

    // Set the text of the word button in the sentence to the selected word
    this.currentSentenceWords[sentenceIndex].textNode.text = word
    this.currentSentenceWords[sentenceIndex].color = 'black'
    this.currentSentenceWords[sentenceIndex].disabled = true

    // If all words have been filled in, complete the sentence
    !this.filledInWords.includes('') && this.completeSentence()
  },
  clearWord: function(sentenceIndex, wordIndex) {
    // Removes a word from the selected void and returns it to the word bank
    // Called when user presses an undo button
    this.filledInWords[sentenceIndex] = ""
    this.currentWords[wordIndex].hidden = false
  },
  update: function(dt) {
    let previousTimeLeft = this.timeLeft
    this.timeLeft -= dt
    if (previousTimeLeft >= 15 && this.timeLeft <= 15) {
      // update player image emarrassed lvl 1
    } else if (previousTimeLeft >= 10 && this.timeLeft <= 10) {
      // update player image emarrassed lvl 2
    } else if (previousTimeLeft >= 5 && this.timeLeft <= 5) {
      // update player image emarrassed lvl 3
    } else if (this.timeLeft <= 0) {
      // endGame()
    }

    this.objects.forEach((obj) => obj.update(dt))
  },
})

export default createScene