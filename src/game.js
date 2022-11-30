import { audioAssets, init, loadAudio, GameLoop } from '../lib/kontra.min.mjs'
import createStartScene from './scenes/start.js'
import createMainScene from './scenes/main.js'
import createEndScene from './scenes/end.js'

const { canvas } = init()

let currentScene = null
let audio = null

WebFont.load({
  google: {
    families: ['Anonymous Pro:n7']
  },
})

loadAudio([
  'assets/wallpaper.mp3'
]).then(() => {
  audio = audioAssets['assets/wallpaper']
  audio.addEventListener('canplaythrough', () => {
    audio.play()
  })
  audio.addEventListener('ended', () => {
    audio.currentTime = 0
    audio.play()
  })
})
loadAudio(['assets/cliche_correct_answer.mp3'])
loadAudio(['assets/cliche_incorrect_answer.mp3'])

// Goes to the intro scene
// Called when the game begins
// Also called when the user presses the try again button on the ending scene
export const showStartScene = () => {
  if (currentScene) {
    currentScene.hide()
    currentScene.destroy()
  }
  currentScene = createStartScene()
  currentScene.show()
}

// Moves from the intro scene to the main scene and resets the round number
// Called when user presses the start button on the initial scene
export const showMainScene = () => {
  if (currentScene) {
    currentScene.hide()
    currentScene.destroy()
  }
  currentScene = createMainScene()
  currentScene.show()
}

// Moves from the main scene to the ending scene
// Called when the time runs out or all the sentences have been completed
export const showEndScene = (win) => {
  if (currentScene) {
    currentScene.hide()
    currentScene.destroy()
  }
  currentScene = createEndScene(win)
  currentScene.show()
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
showStartScene()