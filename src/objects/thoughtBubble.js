import { init, Sprite } from '../../lib/kontra.min.mjs'

init()

const thoughtBubble = Sprite({
  x: 63,
  y: 443,
  width: 955,
  height: 432,
})

let image = new Image()
image.src = 'assets/text_bubble.png'
image.onload = function() {
  thoughtBubble.image = image
}

export default thoughtBubble