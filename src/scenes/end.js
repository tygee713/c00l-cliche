import { init, initPointer, Button, Scene, Sprite, Text } from '../../lib/kontra.min.mjs'
import { showStartScene } from '../game.js'

let { canvas } = init()
initPointer()

let winPicture = null
let lossPicture = null

const picture = Sprite({
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 708,
  height: 572,
  anchor: { x: 0.5, y: 0.5 },
})

let image = new Image()
image.src = 'assets/good_ending.png'
image.onload = function() {
  winPicture = image
}

let image2 = new Image()
image2.src = 'assets/bad_ending.png'
image2.onload = function() {
  lossPicture = image2
}

const title = (win) => Text({
  textAlign: 'center',
  anchor: { x: 0.5, y: 0.5 },
  text: win ? 'great job!!' : 'not so great..',
  font: 'bold 87px Anonymous Pro',
  color: '#83C80B'
})

const winTitle = Sprite({
  x: canvas.width / 2,
  y: 127 / 2,
  width: 611,
  height: 127,
  color: "#392E2D",
  anchor: { x: 0.5, y: 0.5 },
  children: [title(true)]
})

const lossTitle = Sprite({
  x: canvas.width / 2,
  y: 127 / 2,
  width: 763,
  height: 127,
  color: "#392E2D",
  anchor: { x: 0.5, y: 0.5 },
  children: [title(false)]
})

const restartButton = Button({
  x: canvas.width / 2,
  y: 749 + 33,
  width: 293,
  height: 66,
  anchor: { x: 0.5, y: 0.5 },
  color: '#83C80B',
  text: {
    text: 'PLAY AGAIN',
    color: '#392E2D',
    font: '48px Anonymous Pro',
    textAlign: 'center',
    anchor: { x: 0.5, y: 0.5 },
  },
  onDown: function() {
    showStartScene()
  },
  update: function() {
    if (this.hovered) {
      this.color = '#F37DB0'
    } else {
      this.color = '#83C80B'
    }
  }
})

const endScene = (win) => Scene({
  id: 'end',
  objects: [picture, restartButton],
  onShow: function() {
    this.remove([winTitle, lossTitle])
    if (win) {
      picture.image = winPicture
      this.add(winTitle)
    } else {
      picture.image = lossPicture
      this.add(lossTitle)
    }
  }
})

export default endScene