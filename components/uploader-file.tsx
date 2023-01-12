import { useState } from 'react'
import { Uploader } from 'uploader'
import { UploadDropzone } from 'react-uploader'
import { getTextFromImage } from '../utils/textFromImage'

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

export function UploaderFile() {
  const [fileUrl, setFileUrl] = useState<string>('')
  const [textContent, setTextContent] = useState<string>('')
  return (
    <>
      <UploadDropzone
        uploader={uploader}
        options={options}
        onUpdate={(file) => {
          if (file.length > 0) {
            console.log(file[0].fileUrl)
            getTextFromImage(file[0].fileUrl, (content: string) => setTextContent(content))
            setFileUrl(file[0].fileUrl)
          }
        }}
        // width='700px'
        height='375px'
      />
      {textContent ? <h1>{textContent}</h1> : null}
    </>
  )
}
