import Tesseract from 'tesseract.js'

export const getTextFromImage = (imageUrl, setContentImage) => {
  Tesseract.recognize(imageUrl, 'eng', {
    logger: (m) => {
      if (m.status.includes('loading')) {
        console.log('%c%s', 'background: red', m.status)
      } else if (m.status.includes('initializing')) {
        console.log('%c%s', 'background: blue', m.status)
      } else if (m.status.includes('recognizing')) {
        console.log('%c%s', 'background: green', m.progress)
      }
    }
  }).then(({ data: { text } }) => {
    setContentImage(text)
  })
}
