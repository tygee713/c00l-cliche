import { init, Scene } from '../../lib/kontra.min.mjs'
import Friend from '../objects/friend.js'
import Player from '../objects/player.js'
// import Sentence from '../objects/sentence.js'
import ThoughtBubble from '../objects/thoughtBubble.js'
// import Word from '../objects/word.js'

const { canvas } = init()

const scene = Scene({
  id: 'main',
  objects: [Friend, Player, ThoughtBubble],
})

export default scene