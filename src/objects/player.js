import { init, Sprite } from '../../lib/kontra.min.mjs'

const { canvas } = init()

const player = Sprite({
  x: 600,
  y: 300,
  width: 400,
  height: 400,
  anchor: { x: 0.5, y: 0.5 },
})

let image = new Image()
image.src = 'assets/alien.png'
image.onload = function() {
  player.image = image
}

export default player