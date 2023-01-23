import 'styles/globals.css'
import 'styles/prism-one-dark.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { Analytics } from '@vercel/analytics/react'
import config from 'seo/config'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...config} />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
