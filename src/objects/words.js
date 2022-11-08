import { init } from '../../lib/kontra.min.mjs'
import Word from './word.js'

init()

const sampleWords = ['This', 'test']
let xPosition = 400
let yPosition = 600

const words = sampleWords.map((word) => Word(word, xPosition += 100, yPosition))

export default words