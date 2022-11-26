import { init, Sprite } from '../../lib/kontra.min.mjs'

init()

const player = Sprite({
  x: 631,
  y: 75,
  width: 449,
  height: 800
})

let image = new Image()
image.src = 'assets/guy_neutral.png'
image.onload = function() {
  player.image = image
}

export default player