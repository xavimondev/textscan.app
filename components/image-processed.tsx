import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Dimensions } from 'types'

type ImageProcessedProps = {
  fileUrl: string
  dimensions: Dimensions | undefined
  vertices: any
}

export function ImageProcessed({ fileUrl, dimensions, vertices }: ImageProcessedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!vertices) return

    const drawBoundingBox = (context: CanvasRenderingContext2D) => {
      vertices!.forEach((vertex: any) => {
        const { vertices } = vertex
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
      context && drawBoundingBox(context)
    }
  }, [vertices])

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
        className='absolute max-w-full box-border'
      ></canvas>
      {fileUrl && dimensions ? (
        <Image
          src={fileUrl}
          alt='image with selectable text'
          width={dimensions?.width}
          height={dimensions?.height}
          className={`max-w-${dimensions?.width} max-h-${dimensions?.height}`}
        />
      ) : null}
    </div>
  )
}
