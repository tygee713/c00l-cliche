import { init, Sprite } from '../../lib/kontra.min.mjs'

init()

const thoughtBubble = Sprite({
  x: 540,
  y: 600,
  anchor: { x: 0.5, y: 0.5 },
  width: 800,
  height: 300,
  color: 'lightpink',
})

export default thoughtBubble