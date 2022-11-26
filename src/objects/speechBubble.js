import { init, Sprite } from '../../lib/kontra.min.mjs'

init()

const responseNeutral = Sprite({
  width: 248,
  height: 234
})

const speechBubble = Sprite({
  x: 344,
  y: 44,
  width: 248,
  height: 234,
  children: [responseNeutral]
})

let image = new Image()
image.src = 'assets/speech_bubble.png'
image.onload = function() {
  speechBubble.image = image
}

let image2 = new Image()
image2.src = 'assets/response_neutral.png'
image2.onload = function() {
  responseNeutral.image = image2
}

export default speechBubble