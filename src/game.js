import { init, GameLoop } from '../lib/kontra.min.mjs'
import MainScene from './scenes/main.js'

const { canvas } = init()

const loop = GameLoop({
  update: (dt) => {
    MainScene.update()
  },
  render: () => {
    MainScene.render()
  }
})

loop.start()