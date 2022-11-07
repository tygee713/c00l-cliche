import { init, GameLoop } from 'lib/kontra.min.js'
import MainScene from './scenes/main'

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