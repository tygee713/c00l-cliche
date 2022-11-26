import { init, initPointer, Button, Scene, Sprite, Text } from '../../lib/kontra.min.mjs'
import { showMainScene } from '../game.js'

let { canvas } = init()
initPointer()

const player = Sprite({
  x: 600,
  y: canvas.height / 2,
  x: 280,
  width: 400,
  height: 400,
  anchor: { x: 0.5, y: 0.5 },
})

let image = new Image()
// TODO: use real image
image.src = 'assets/alien.png'
image.onload = function() {
  player.image = image
}

const titleBox = Sprite({
  x: 620,
  y: 126,
  width: 300,
  height: 120,
  color: "#392E2D"
})

const title = Text({
  x: 770,
  y: 186,
  textAlign: 'center',
  anchor: { x: 0.5, y: 0.5 },
  text: 'TITLE',
  font: 'bold 87px Anonymous Pro',
  color: '#83C80B'
})

// let f = new FontFace("Anonymous Pro", "url(https://fonts.googleapis.com/css2?family=Anonymous+Pro)")
// f.load().then(() => {
//   title.font = '87px "Anonymous Pro"'
// })

const textBox = Sprite({
  x: 540,
  y: 186,
  width: 459,
  height: 563,
  color: 'white'
})

const text = Text({
  x: textBox.x + textBox.width / 2,
  y: textBox.y + 132,
  textAlign: 'center',
  anchor: { x: 0.5, y: 0 },
  text: 'After spending a gap\nyear on Earth, you want\nto impress your friends\nback home with your\nfull grasp of the\npopular language\n\"English\"....',
  color: '#392E2D',
  font: '28px Anonymous Pro'
})

const secondaryText = Text({
  x: text.x,
  y: text.y + text.height + 32,
  textAlign: 'center',
  anchor: { x: 0.5, y: 0.5 },
  text: 'but don\'t take too long!',
  color: '#392E2D',
  font: 'bold 28px Anonymous Pro'
})

const startButton = Button({
  x: textBox.x + textBox.width / 2,
  y: textBox.y + textBox.height - 41.5 - 33,
  width: 293,
  height: 66,
  anchor: { x: 0.5, y: 0.5 },
  color: '#83C80B',
  text: {
    text: 'START GAME',
    color: '#392E2D',
    font: '48px Anonymous Pro',
    textAlign: 'center',
    anchor: { x: 0.5, y: 0.5 },
  },
  onDown: function() {
    this.color = '#F37DB0'
  },
  onUp: function() {
    this.color = '#83C80B'
    showMainScene()
  }
})

const createScene = () => Scene({
  id: 'start',
  objects: [player, textBox, titleBox, title, text, secondaryText, startButton]
})

export default createScene