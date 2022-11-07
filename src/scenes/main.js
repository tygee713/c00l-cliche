import { Scene } from 'lib/kontra.min.js'
import { friend } from '../objects/friend.js'
import Player from '../objects/player.js'
import Sentence from '../objects/sentence.js'
import ThoughtBubble from '../objects/thoughtBubble.js'
import Word from '../objects/word.js'

const scene = Scene({
  id: 'main',
  objects: [Player],
})

export default scene