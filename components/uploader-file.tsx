import { useState } from 'react'
import { Uploader } from 'uploader'
import { UploadDropzone } from 'react-uploader'
import { getTextFromImage } from '../utils/textFromImage'
import { ImageProcessed } from './image-processed'

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
  const [words, setWords] = useState<any>(undefined)

  // useEffect(() => {
  //   if (fileUrl) getDimensions(fileUrl)
  // }, [fileUrl])
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
            getTextFromImage(file[0].fileUrl, (blocks: any) => setWords(blocks))
            setFileUrl(file[0].fileUrl)
          }
        }}
        // width='700px'
        height='375px'
      />
      {/* {textContent ? <h1>{textContent}</h1> : null} */}
      <ImageProcessed dimensions={dimensions} fileUrl={fileUrl} words={words} />
    </>
  )
}
