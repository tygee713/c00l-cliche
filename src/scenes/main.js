import { init, initPointer, Button, Scene, Sprite, GameObject } from '../../lib/kontra.min.mjs'
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

const createSentenceObject = (sentenceWords) => GameObject({
  y: 209,
  width: sentenceWords.reduce((total, word) => word.width + total, 0) + ((sentenceWords.length - 1) * 16),
  children: sentenceWords,
})

let image = new Image()
image.src = 'assets/background.png'
image.onload = function() {
  background.image = image
}

const createScene = () => Scene({
  id: 'main',
  objects: [background, Friend, Player, SpeechBubble, ThoughtBubble],
  currentSentenceWords: [],
  currentWords: [],
  roundNumber: 0,
  filledInWords: [],
  numCorrect: 0,
  numIncorrect: 0,
  timeLeft: 8,
  timeSinceAnswered: null,
  selectedSentenceWordIndex: null,
  selectedWordBankIndex: null,
  onShow: function() {
    this.currentSentenceWords = []
    this.currentWords = []
    this.roundNumber = 0
    this.filledInWords = []
    this.numCorrect = 0
    this.numIncorrect = 0
    this.timeLeft = 8
    this.timeSinceAnswered = null
    this.selectedSentenceWordIndex = null
    this.selectedWordBankIndex = null

    this.objects.forEach((obj) => obj.reset && obj.reset())

    this.showNextSentence()
  },
  showNextSentence: function() {
    // Gets the next sentence in the list and creates the word bank
    // Called after the sentence is completed or the time runs out
    ThoughtBubble.removeChild(ThoughtBubble.children)
    this.remove(this.currentWords)
    this.filledInWords = []

    let sentence = sentences[this.roundNumber]
    sentence.parts.forEach((part, i) => {
      if (sentence.emptyPositions.includes(i)) {
        this.filledInWords[i] = ''
      } else {
        this.filledInWords[i] = part
      }
    })

    this.selectedSentenceWordIndex = null
    this.selectedWordBankIndex = null
    this.currentSentenceWords = createSentence(sentence, this)
    this.currentWords = createWords(sentence.options, this)
    let sentenceObject = createSentenceObject(this.currentSentenceWords)
    sentenceObject.x = -sentenceObject.width / 2
    ThoughtBubble.addChild(sentenceObject)
    this.add([...this.currentWords])
    this.timeLeft = 8
    SpeechBubble.changeResponse()
    Friend.changeResponse()
    Player.changeResponse()
  },
  completeSentence: function() {
    // Determine if the filled in sentence is correct
    // Called when all of the words are filled in
    if (this.filledInWords.join(' ').toLowerCase() == sentences[this.roundNumber].parts.join(' ').toLowerCase()) {
      this.numCorrect++
      SpeechBubble.changeResponse('correct')
      Friend.changeResponse('correct')
      Player.changeResponse('correct')
    } else {
      this.numIncorrect++
      SpeechBubble.changeResponse('incorrect')
      Friend.changeResponse('incorrect')
      Player.changeResponse('incorrect')
    }

    // Mark individual choices correct or incorrect
    
    this.timeSinceAnswered = 0
    this.currentWords.forEach((word) => word.disabled = true)
  },
  fillInWord: function(word, sentenceIndex, wordIndex) {
    // Changes the void in the sentence with the word that was selected
    // Called when a void and a word are both selected
    this.filledInWords[sentenceIndex] = word

    // TODO: figure out how to hide button completely
    this.currentWords[wordIndex].opacity = 0
    this.currentWords[wordIndex].disabled = true
  
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
    if (this.timeSinceAnswered !== null) {
      this.timeSinceAnswered += dt

      if (this.timeSinceAnswered > 2) {
        this.timeSinceAnswered = null
        if (this.roundNumber < sentences.length - 1) {
          this.roundNumber++
          this.showNextSentence()
        } else {
          showEndScene(this.numCorrect >= 7)
        }
      }
    } else {
      let previousTimeLeft = this.timeLeft
      this.timeLeft -= dt
      if (previousTimeLeft > 4 && this.timeLeft <= 4) {
        SpeechBubble.changeResponse('confused')
        Friend.changeResponse('confused')
        Player.changeResponse('confused')
      } else if (previousTimeLeft > 0 && this.timeLeft <= 0) {
        this.completeSentence()
      }
    }

    this.objects.forEach((obj) => obj.update(dt))
  },
})

export default createScene