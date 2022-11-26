import { init, Sprite } from '../../lib/kontra.min.mjs'

init()

let imageNeutral = null
let imageCorrect = null
let imageIncorrect = null
let imageConfused = null

const friend = Sprite({
  x: 44,
  y: 75,
  width: 398,
  height: 524,
  reset: function() {
    this.image = null
  },
  changeResponse: function(response) {
    switch(response) {
      case 'correct':
        this.image = imageCorrect
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
image.src = 'assets/girl_neutral.png'
image.onload = function() {
  imageNeutral = image
}

let image2 = new Image()
image2.src = 'assets/girl_correct.png'
image2.onload = function() {
  imageCorrect = image2
}

let image3 = new Image()
image3.src = 'assets/girl_incorrect.png'
image3.onload = function() {
  imageIncorrect = image3
}

let image4 = new Image()
image4.src = 'assets/girl_confused.png'
image4.onload = function() {
  imageConfused = image4
}

export default friend