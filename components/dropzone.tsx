import { Uploader } from 'uploader'
import { UploadDropzone } from 'react-uploader'

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

type DropzoneProps = {
  getDimensions: (fileUrl: string) => Promise<void>
  getTextFromImage: (fileUrl: string) => Promise<void>
  setFileUrl: (fileUrl: string) => void
}

export function Dropzone({ getDimensions, getTextFromImage, setFileUrl }: DropzoneProps) {
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
    </>
  )
}
