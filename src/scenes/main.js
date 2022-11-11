import { init, Scene } from '../../lib/kontra.min.mjs'
import Friend from '../objects/friend.js'
import Player from '../objects/player.js'
import Sentence from '../objects/sentence.js'
import ThoughtBubble from '../objects/thoughtBubble.js'
import WordBank from '../objects/wordBank.js'
import { endGame } from '../game.js'

const { canvas } = init()

const ignoredWords = ['is', 'a']

// if dynamic creation doesn't work, create a const file with an array of positions
const sentences = ['This is a test']

const scene = Scene({
  id: 'main',
  objects: [Friend, Player, ThoughtBubble],
  currentSentenceWords: [],
  currentWords: [],
  roundNumber: 0,
  filledInWords: [],
  numCorrect: 0,
  numIncorrect: 0,
  selectedSentenceWordIndex: null,
  selectedWordBankIndex: null,
  onShow: function() {
    this.showNextSentence()
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
    this.currentSentenceWords = Sentence(sentences[this.roundNumber])
    this.currentWords = WordBank(wordsToAdd)
    this.add([...this.currentSentenceWords, ...this.currentWords])
  },
  completeSentence: function() {
    // Determine if the filled in sentence is correct
    // Called when all of the words are filled in
    if (this.filledInWords.join(' ') == sentences[this.roundNumber]) {
      this.numCorrect++
    } else {
      this.numIncorrect++
    }
    
    if (this.roundNumber < sentences.length - 1) {
      this.roundNumber++
      this.showNextSentence()
    } else {
      endGame()
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
})

export default scene