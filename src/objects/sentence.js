const sampleSentence = 'This is a test'

const ignored = ['is', 'a']

sampleSentence.forEach((word) => {
  if (!ignored.includes(word)) {
    // render a box sprite with a width relative to # of chars in the word
  } else {
    // render text for the word
  }
})