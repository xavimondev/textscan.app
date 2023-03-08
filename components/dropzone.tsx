import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type DropzoneProps = {
  getDimensions: (file: File) => Promise<void>
  getTextFromImage: (file: File) => Promise<void>
  setFileUrl: (fileUrl: string) => void
  setIsLoadingResults: Dispatch<SetStateAction<boolean>>
}

function DropzoneBody() {
  return (
    <div className='flex flex-col space-y-6 items-center'>
      <span className='uppercase text-2xl sm:text-5xl font-medium text-gray-300'>Drag & Drop</span>
      <p className='text-center text-sm sm:text-base text-gray-500'>
        your images here, or click to select files
      </p>
    </div>
  )
}

export function Dropzone({
  getDimensions,
  getTextFromImage,
  setFileUrl,
  setIsLoadingResults
}: DropzoneProps) {
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false)

  const onDrop = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0]
      setFileUrl(URL.createObjectURL(file))
      setIsUploadingFile(true)
      getTextFromImage(file)
      getDimensions(file)
      setIsLoadingResults(true)
      setIsUploadingFile(false)
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 20971520, // 21MB
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg']
    },
    onDrop,
    onError: (err) => console.log(err)
  })

  return (
    <>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className='mt-4 flex items-center justify-center bg-transparent overflow-hidden w-[320] h-[250px] sm:w-[500px] sm:h-[300px] z-0 rounded-xl shadow-sm border-dashed border-2 border-white cursor-pointer mb-8'
      >
        <input {...getInputProps()} />
        {isUploadingFile ? (
          <p className='text-center text-base text-gray-500'>Uploading files...</p>
        ) : (
          <DropzoneBody />
        )}
      </div>
    </>
  )
}
