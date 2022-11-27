import { init, Sprite } from '../../lib/kontra.min.mjs'

init()

const responseNeutral = Sprite({
  width: 248,
  height: 234
})

const responseIncorrect = Sprite({
  width: 248,
  height: 234
})

const responseCorrect = Sprite({
  width: 248,
  height: 234
})

const confusedMark1 = Sprite({
  width: 37,
  height: 69,
  x: 204,
  y: 111,
  timeElapsed: 0,
  update: function(dt) {
    this.timeElapsed += dt
    if (this.timeElapsed % 1 < .2 || this.timeElapsed % 1 > .7) {
      this.y -= 0.5
    } else {
      this.y += 0.5
    }
  }
})

const confusedMark2 = Sprite({
  width: 37,
  height: 69,
  x: 211,
  y: 47,
  timeElapsed: 0,
  update: function(dt) {
    this.timeElapsed += dt
    if (this.timeElapsed % 1 < .3 || this.timeElapsed % 1 > .8) {
      this.y -= 0.5
    } else {
      this.y += 0.5
    }
  }
})

const speechBubble = Sprite({
  x: 344,
  y: 44,
  width: 248,
  height: 234,
  children: [responseNeutral],
  changeResponse: function(response) {
    this.removeChild(this.children)
    switch(response) {
      case 'correct':
        this.addChild(responseCorrect)
        break
      case 'incorrect':
        this.addChild(responseIncorrect)
        break
      case 'confused':
        this.addChild(responseNeutral)
        this.addChild(confusedMark1)
        this.addChild(confusedMark2)
        break
      default:
        this.addChild(responseNeutral)
        break
    }
  }
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

let image3 = new Image()
image3.src = 'assets/response_correct.png'
image3.onload = function() {
  responseCorrect.image = image3
}

let image4 = new Image()
image4.src = 'assets/response_incorrect.png'
image4.onload = function() {
  responseIncorrect.image = image4
}

let image5 = new Image()
image5.src = 'assets/confused_mark_1.png'
image5.onload = function() {
  confusedMark1.image = image5
}

let image6 = new Image()
image6.src = 'assets/confused_mark_2.png'
image6.onload = function() {
  confusedMark2.image = image6
}

export default speechBubble