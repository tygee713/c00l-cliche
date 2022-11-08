import { init, Sprite } from '../../lib/kontra.min.mjs'

init()

const friend = Sprite({
  x: 450,
  y: 150,
  width: 200,
  height: 200,
  anchor: { x: 0.5, y: 0.5 },
})

let image = new Image()
image.src = 'assets/sample.png'
image.onload = function() {
  friend.image = image
}

export default friend