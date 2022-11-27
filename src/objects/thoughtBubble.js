import { init, Sprite } from '../../lib/kontra.min.mjs'

let { canvas } = init()

const thoughtBubble = Sprite({
  x: canvas.width / 2,
  y: 443,
  width: 955,
  height: 432,
  anchor: { x: 0.5, y: 0 }
})

let image = new Image()
image.src = 'assets/text_bubble.png'
image.onload = function() {
  thoughtBubble.image = image
}

export default thoughtBubble