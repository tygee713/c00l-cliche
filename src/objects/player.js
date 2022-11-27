import { init, Sprite } from '../../lib/kontra.min.mjs'

init()

let imageNeutral = null
let imageCorrect = null
let imageIncorrect = null
let imageConfused = null

const sparkle1 = Sprite({
  width: 60,
  height: 61,
  x: 307,
  y: 194,
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

const sparkle2 = Sprite({
  width: 72,
  height: 126,
  x: 63,
  y: 99,
  timeElapsed: 0,
  update: function(dt) {
    this.timeElapsed += dt
    if (this.timeElapsed % 1 < .5) {
      this.y -= 0.5
    } else {
      this.y += 0.5
    }
  }
})

const sparkle3 = Sprite({
  width: 72,
  height: 126,
  x: 267,
  y: 214,
  timeElapsed: 0,
  update: function(dt) {
    this.timeElapsed += dt
    if (this.timeElapsed % 1 < .3 || this.timeElapsed % 1 > .8) {
      this.y += 0.5
    } else {
      this.y -= 0.5
    }
  }
})

const player = Sprite({
  x: 631,
  y: 75,
  width: 449,
  height: 800,
  reset: function() {
    this.image = null
    this.removeChild(this.children)
  },
  changeResponse: function(response) {
    if (response !== 'correct') this.removeChild(this.children)
    switch(response) {
      case 'correct':
        this.image = imageCorrect
        this.addChild(sparkle1)
        this.addChild(sparkle2)
        this.addChild(sparkle3)
        break
      case 'incorrect':
        this.image = imageIncorrect
        break
      case 'confused':
        this.image = imageConfused
        break
      default:
        this.image = imageNeutral
        break
    }
  },
  update: function() {
    if (!this.image) this.image = imageNeutral
  }
})

let image = new Image()
image.src = 'assets/guy_neutral.png'
image.onload = function() {
  imageNeutral = image
}

let image2 = new Image()
image2.src = 'assets/guy_correct.png'
image2.onload = function() {
  imageCorrect = image2
}

let image3 = new Image()
image3.src = 'assets/guy_incorrect.png'
image3.onload = function() {
  imageIncorrect = image3
}

let image4 = new Image()
image4.src = 'assets/guy_confused.png'
image4.onload = function() {
  imageConfused = image4
}

let image5 = new Image()
image5.src = 'assets/sparkle_1.png'
image5.onload = function() {
  sparkle1.image = image5
}

let image6 = new Image()
image6.src = 'assets/sparkle_2.png'
image6.onload = function() {
  sparkle2.image = image6
  sparkle3.image = image6
}

export default player