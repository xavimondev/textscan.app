import { useState, Dispatch, SetStateAction } from 'react'
import { Dimensions } from 'types'
import { CodeResult } from './code-result'
import { ImageProcessed } from './image-processed'
import { TextResult } from './text-result'

type ResultProps = {
  isCode: boolean
  fileUrl: string
  dimensions: Dimensions | undefined
  vertices: any
  text: string
  setIsLoadingResults: Dispatch<SetStateAction<boolean>>
}

export function Result({
  isCode,
  fileUrl,
  dimensions,
  vertices,
  text,
  setIsLoadingResults
}: ResultProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  return (
    <div className='mx-auto sm:max-w-8xl px-2.5 flex flex-col lg:flex-row gap-4 items-center justify-center mb-10'>
      <ImageProcessed
        dimensions={dimensions}
        fileUrl={fileUrl}
        vertices={vertices}
        setIsLoaded={setIsLoaded}
        setIsLoadingResults={setIsLoadingResults}
      />
      <div>
        <svg
          height='21'
          viewBox='0 0 21 21'
          className='w-14 h-14 text-gray-400'
          width='21'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g
            className='hidden lg:block'
            fill='none'
            fillRule='evenodd'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            transform='translate(4 6)'
          >
            <path className='hidden lg:block' d='m9.5.497 4 4.002-4 4.001' />
            <path className='hidden lg:block' d='m.5 4.5h13' />
          </g>

          <g
            className='block lg:hidden'
            fill='none'
            fillRule='evenodd'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            transform='translate(6 4)'
          >
            <path className='block lg:hidden' d='m.5 9.499 4 4.001 4-4.001' />
            <path className='block lg:hidden' d='m4.5.5v13' transform='matrix(-1 0 0 -1 9 14)' />
          </g>
        </svg>
      </div>
      {isLoaded ? isCode ? <CodeResult code={text} /> : <TextResult text={text} /> : null}
    </div>
  )
}
