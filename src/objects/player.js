import { Sprite } from 'lib/kontra.min.js'

const player = Sprite({
  x: 200,
  y: 200,
  anchor: { x: 0.5, y: 0.5 },
})

let image = new Image()
image.src = 'assets/sample.png'
image.onload = function() {
  player.image = image
}

export default player