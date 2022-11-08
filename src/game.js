import { init, GameLoop } from '../lib/kontra.min.mjs'
import MainScene from './scenes/main.js'
import Sentence from './objects/sentence.js'

const { canvas } = init()

let currentScene = 0

// Moves from the intro scene to the main scene and resets the round number
// Called when user presses the start button on the initial scene
const startGame = () => {
  currentScene = 1
}

// Moves from the main scene to the ending scene
// Called when the time runs out or all the sentences have been completed
const endGame = () => {
  currentScene = 2
}

// Goes back to the starting scene
// Called when the user presses the try again button on the ending scene
const restartGame = () => {
  currentScene = 0
}

const loop = GameLoop({
  update: (dt) => {
    MainScene.update()
  },
  render: () => {
    MainScene.render()
  }
})

loop.start()