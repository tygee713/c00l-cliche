import { init, GameLoop } from '../lib/kontra.min.mjs'
// import StartScene from './scenes/start.js'
import MainScene from './scenes/main.js'
// import EndScene from './scenes/end.js'

const { canvas } = init()

let currentScene = null

// Moves from the intro scene to the main scene and resets the round number
// Called when user presses the start button on the initial scene
const startGame = () => {
  currentScene = MainScene
  currentScene.show()
}

// Moves from the main scene to the ending scene
// Called when the time runs out or all the sentences have been completed
const endGame = () => {
  currentScene = EndScene
}

// Goes back to the starting scene
// Called when the user presses the try again button on the ending scene
const restartGame = () => {
  currentScene = StartScene
}

const loop = GameLoop({
  update: (dt) => {
    currentScene && currentScene.update(dt)
  },
  render: () => {
    currentScene && currentScene.render()
  }
})

loop.start()
startGame()