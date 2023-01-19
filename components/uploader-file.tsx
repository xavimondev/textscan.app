import { useState } from 'react'
import { Uploader } from 'uploader'
import { UploadDropzone } from 'react-uploader'
import { ImageProcessed } from './image-processed'
import { TextResult } from './text-result'

const uploader = Uploader({ apiKey: 'free' })
const options = {
  maxFileCount: 1,
  mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: '#fff'
    },
    fontSizes: {
      base: 16
    }
  }
}
export type Dimensions = {
  width: number
  height: number
}
export function UploaderFile() {
  const [fileUrl, setFileUrl] = useState<string>('')
  const [dimensions, setDimensions] = useState<Dimensions | undefined>(undefined)
  const [vertices, setVertices] = useState<any>(undefined)
  const [text, setText] = useState<string>('')

  const getDimensions = async (urlImage: string) => {
    // https://upcdn.io/W142hJk/raw/demo/4miRUPmq8j.png
    const response = await fetch('/api/image-size', {
      method: 'POST',
      body: JSON.stringify({
        urlImage
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setDimensions(data)
  }

  const getTextFromImage = async (imageUrl: string) => {
    const response = await fetch('/api/detect-text', {
      method: 'POST',
      body: JSON.stringify({
        imageUrl
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (data.ok) {
      setText(data.text)
      setVertices(data.vertices)
    }
    console.log(data)
  }

  return (
    <>
      <UploadDropzone
        uploader={uploader}
        options={options}
        onUpdate={(file) => {
          if (file.length > 0) {
            getDimensions(file[0].fileUrl)
            getTextFromImage(file[0].fileUrl)
            setFileUrl(file[0].fileUrl)
          }
        }}
        // width='700px'
        height='375px'
      />
      {/* {textContent ? <h1>{textContent}</h1> : null} */}
      <ImageProcessed dimensions={dimensions} fileUrl={fileUrl} vertices={vertices} />
      <TextResult text={text} />
    </>
  )
}
