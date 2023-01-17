import { useEffect, useRef } from 'react'
import Image from 'next/image'
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

    function highlightWords(context: any) {
      words.forEach((w) => {
        const b = w.bbox

        context.strokeWidth = 2

        context.strokeStyle = 'red'
        context.strokeRect(b.x0, b.y0, b.x1 - b.x0, b.y1 - b.y0)
        context.beginPath()
        context.moveTo(w.baseline.x0, w.baseline.y0)
        context.lineTo(w.baseline.x1, w.baseline.y1)
        context.strokeStyle = 'green'
        context.stroke()
      })
    }
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = dimensions!.width
      canvas.height = dimensions!.height
      const context = canvas.getContext('2d')
      highlightWords(context)
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
