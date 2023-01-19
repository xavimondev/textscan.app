import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Tesseract from 'tesseract.js'
import { Dimensions } from './uploader-file'

type ImageProcessedProps = {
  fileUrl: string
  dimensions: Dimensions | undefined
  words: Tesseract.Word[]
}

export function ImageProcessed({ fileUrl, dimensions, words }: ImageProcessedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!words) return

    function highlightWords(context: CanvasRenderingContext2D) {
      words.forEach((word: any) => {
        const { vertices } = word
        /* Example vertex:
          {x: 195, y: 32}, {x: 478, y: 34}, 
          {x: 477, y: 100}, {x: 194, y: 98}
        */
        // top line
        const firstVertex = vertices[0] // {x: 195, y: 32}
        const secondVertex = vertices[1] // {x: 478, y: 34}
        // bottom line
        const thirdVertex = vertices[2] // {x: 477, y: 100}
        const fourthVertex = vertices[3] // {x: 194, y: 98}

        // Getting coordinate to draw rectangle around word
        const x = firstVertex.x
        const y = Math.max(firstVertex.y, secondVertex.y)
        const width = secondVertex.x - x + 4
        const height = Math.max(thirdVertex.y, fourthVertex.y) - y

        context.lineWidth = 2
        context.strokeStyle = 'red'
        context.strokeRect(x, y, width, height)
      })
    }
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = dimensions!.width
      canvas.height = dimensions!.height
      const context = canvas.getContext('2d')
      context && highlightWords(context)
    }
  }, [words])

  return (
    <div
      style={{
        position: 'relative'
      }}
    >
      <canvas
        ref={canvasRef}
        width={1486}
        height={668}
        style={{
          position: 'absolute',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}
      ></canvas>
      {fileUrl && (
        <Image
          src={fileUrl}
          alt='image with selectable text'
          width={0}
          height={0}
          sizes='100vw'
          className='w-full h-auto'
        />
      )}
    </div>
  )
}
