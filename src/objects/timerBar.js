import { init, Sprite } from '../../lib/kontra.min.mjs'

let { canvas } = init()

let blockSize = canvas.width / 8

const fill = Sprite({
  width: canvas.width,
  height: 15,
  color: '#392E2D',
  update: function(dt) {
    if (!this.parent?.paused) {
      let previousWidth = this.width
      this.width -= dt * blockSize
      if (previousWidth >= canvas.width / 2 && this.width < canvas.width / 2) {
        this.color = '#C82C0B'
      }
    }
  },
  reset: function() {
    this.width = canvas.width
    this.color = '#392E2D'
  }
})

const timerBar = Sprite({
  y: canvas.height - 15,
  width: canvas.width,
  height: 15,
  color: '#C9BDBB',
  children: [fill],
  paused: false,
  reset: function() {
    fill.reset()
    this.paused = false
  },
  pause: function() {
    this.paused = true
  }
})

export default timerBar