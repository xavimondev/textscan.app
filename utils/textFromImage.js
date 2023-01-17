import Tesseract from 'tesseract.js'

export const getTextFromImage = (imageUrl, setWords) => {
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
  }).then((result) => {
    console.log(result)
    const {
      data: { words }
    } = result
    setWords(words)
    // const wordsHighlighted = words
    //   .filter(({ confidence }) => confidence > 10)
    //   .map((word) => {
    //     const div = document.createElement('div')
    //     const { x0, x1, y0, y1 } = word.bbox
    //     div.style.top = `${y0}px`
    //     div.style.left = `${x0}px`
    //     div.style.width = `${x1 - x0}px`
    //     div.style.height = `${y1 - y0}px`
    //     div.style.border = '1px solid red'
    //     div.style.position = 'absolute'

    //     const span = document.createElement('span')
    //     span.textContent = word.text
    //     span.style.fontSize = word.font_size + 'px'
    //     div.appendChild(span)
    //     return div
    //   })
    // setBlocksText(wordsHighlighted)
  })
}
