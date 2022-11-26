import { init, Sprite } from '../../lib/kontra.min.mjs'

init()

const friend = Sprite({
  x: 44,
  y: 75,
  width: 398,
  height: 524
})

let image = new Image()
image.src = 'assets/girl_neutral.png'
image.onload = function() {
  friend.image = image
}

export default friend