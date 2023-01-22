// import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { Plus_Jakarta_Sans } from '@next/font/google'
import { RoughNotation } from 'react-rough-notation'
import { Dimensions } from 'types'
import { Dropzone } from 'components/dropzone'
import { Toggle } from 'components/toggle'
import { CodeResult } from 'components/code-result'
import { ImageProcessed } from 'components/image-processed'
import { TextResult } from 'components/text-result'
import { Alert } from 'components/alert'

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['500'],
  style: ['normal'],
  subsets: ['latin']
})

export default function Home() {
  const [isCode, setIsCode] = useState<boolean>(false)
  const [fileUrl, setFileUrl] = useState<string>('')
  const [vertices, setVertices] = useState<any>(undefined)
  const [dimensions, setDimensions] = useState<Dimensions | undefined>(undefined)
  const [text, setText] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const getDimensions = async (urlImage: string) => {
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

  const getTextFromImage = async (urlImage: string) => {
    const response = await fetch('/api/detect-text', {
      method: 'POST',
      body: JSON.stringify({
        imageUrl: urlImage
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (!data.ok) {
      setError(true)
      console.log(data.msg)
      return
    }
    setText(data.text)
    setVertices(data.vertices)
    setError(false)
  }

  return (
    <div className='flex min-h-screen flex-col bg-[#0e0f11]'>
      <header className='sticky top-0 z-50 px-5 md:px-20 backdrop-blur-md border-b border-gray-700'>
        <div className='flex h-16 items-center justify-between'>
          <span className='text-xl text-white'>textscan.app</span>
          <div className='flex items-center gap-4'>
            <Link
              aria-label='Go to Repository'
              rel='noopener noreferrer'
              href='https://github.com/d3vcloud/textscan.app'
              target='_blank'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='currentColor'
                viewBox='0 0 24 24'
                className='h-5 w-5 text-white'
              >
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'></path>
              </svg>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <div className='mx-auto mt-20 mb-10 max-w-md px-2.5 text-center sm:max-w-lg sm:px-0'>
          <h1
            className={`mt-5 text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl sm:leading-[1.15] ${plusJakartaSans.className}`}
          >
            <RoughNotation type='highlight' show color='#F1E740'>
              <span className='bg-gradient-to-r from-[#8e1d9e] to-[#b764c5] bg-clip-text text-transparent'>
                TextScan
              </span>
            </RoughNotation>
            from your images
          </h1>
          <h2 className={`mt-5 text-lg text-[#a2a2a2] sm:text-xl ${plusJakartaSans.className}`}>
            TextScan is a platform to scan text content or code from images.
          </h2>
          {/* An image, gif maybe showing demo of the product */}
          <div></div>
          <div className='mx-auto mt-10 max-w-fit space-x-4'>
            <a
              className='rounded-full border border-white bg-white py-3 px-5 text-base font-semibold text-black shadow-lg transition-all hover:bg-white/90'
              href='#givetry'
            >
              Get Started
            </a>
          </div>
        </div>
        <div
          id='givetry'
          className='mx-auto mt-20 mb-10 max-w-md px-2.5 flex flex-col justify-center items-center sm:max-w-lg sm:px-0'
        >
          <h2 className='font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl sm:leading-tight'>
            Give a Try
          </h2>
          <Toggle isCode={isCode} setIsCode={setIsCode} />
          {error && <Alert msg='Failed to get text from image' />}
          {fileUrl && (
            <div className='p-0.5 mt-4 text-base rounded-2xl text-gray-400 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
              <div className='py-2 px-5 rounded-2xl flex gap-2 items-center h-full bg-[#0e0f11]'>
                <span className='sr-only'>Info</span>
                <p className='font-medium'>Want to upload new image?</p>
                <button
                  type='button'
                  onClick={() => {
                    setDimensions(undefined)
                    setText('')
                    setVertices(undefined)
                    setFileUrl('')
                  }}
                  className='font-semibold rounded-lg px-4 py-1 text-center text-white bg-transparent border hover:bg-gray-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 dark:hover:text-white dark:focus:ring-green-800'
                >
                  Upload
                </button>
              </div>
            </div>
          )}
          {!fileUrl && (
            <Dropzone
              getDimensions={getDimensions}
              getTextFromImage={getTextFromImage}
              setFileUrl={setFileUrl}
            />
          )}
        </div>
        {!error && vertices ? (
          <div className='mx-auto sm:max-w-8xl px-2.5 flex flex-col lg:flex-row gap-4 items-center justify-center mb-10'>
            <ImageProcessed dimensions={dimensions} fileUrl={fileUrl} vertices={vertices} />
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
                  <path
                    className='block lg:hidden'
                    d='m4.5.5v13'
                    transform='matrix(-1 0 0 -1 9 14)'
                  />
                </g>
              </svg>
            </div>
            {isCode ? <CodeResult code={text} /> : <TextResult text={text} />}
          </div>
        ) : null}
      </main>
      <footer>
        <div className='py-10 space-x-12 flex items-center justify-center border-t border-gray-700'>
          <Link
            href='https://twitter.com/xavimonp'
            aria-label='Follow on twitter'
            target='_blank'
            rel='noreferrer'
            className='transition hover:scale-110'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 248 204'
              className='h-6 w-6 text-white'
            >
              <path
                fill='currentColor'
                d='M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z'
              ></path>
            </svg>
          </Link>
          <Link
            href='https://github.com/d3vcloud/textscan.app'
            aria-label='Go to Repository'
            target='_blank'
            rel='noreferrer'
            className='transition hover:scale-110'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              viewBox='0 0 24 24'
              className='h-6 w-6 text-white'
            >
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'></path>
            </svg>
          </Link>
        </div>
      </footer>
    </div>
  )
}
