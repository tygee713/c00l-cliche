import { init, initPointer, Scene, Button } from '../../lib/kontra.min.mjs'
import Friend from '../objects/friend.js'
import Player from '../objects/player.js'
import ThoughtBubble from '../objects/thoughtBubble.js'
import createSentence from '../objects/sentence.js'
import createWords from '../objects/wordBank.js'
import { showEndScene } from '../game.js'

const { canvas } = init()
initPointer()

const ignoredWords = ['is', 'a']

// if dynamic creation doesn't work, create a const file with an array of positions
const sentences = ['This is a test']

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
  objects: [Friend, Player, ThoughtBubble, endButton],
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
    let wordsToAdd = []

    sentences[this.roundNumber].split(' ').forEach((word, i) => {
      if (ignoredWords.includes(word)) {
        this.filledInWords[i] = word
      } else {
        this.filledInWords[i] = ''
        wordsToAdd.push(word)
      }
    })
    this.currentSentenceWords = createSentence(sentences[this.roundNumber], this)
    this.currentWords = createWords(wordsToAdd, this)
    this.add([...this.currentSentenceWords, ...this.currentWords])
  },
  completeSentence: function() {
    // Determine if the filled in sentence is correct
    // Called when all of the words are filled in
    if (this.filledInWords.join(' ') == sentences[this.roundNumber]) {
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
    this.currentWords[wordIndex].width = 0
    this.currentWords[wordIndex].height = 0
  
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