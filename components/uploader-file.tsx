import { useState } from 'react'
import { Uploader } from 'uploader'
import { UploadDropzone } from 'react-uploader'

const uploader = Uploader({ apiKey: 'free' })
const options = {
  maxFileCount: 1,
  mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  editor: { images: { crop: false } },
  styles: {
    // colors: {
    //   active: '#fff',
    //   primary: 'red'
    // },
    fontSizes: {
      base: 16
    }
  }
}

export function UploaderFile() {
  const [fileUrl, setFileUrl] = useState<string>('')
  return (
    <>
      <UploadDropzone
        uploader={uploader}
        options={options}
        onUpdate={(file) => {
          if (file.length > 0) {
            console.log(file[0].fileUrl)
            setFileUrl(file[0].fileUrl)
          }
        }}
        // width='700px'
        height='375px'
      />
      <h1>{fileUrl}</h1>
    </>
  )
}
