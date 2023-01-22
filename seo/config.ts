import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  title: 'TextScan',
  description: 'textscan for getting text content from your images',
  defaultTitle: 'TextScan',
  openGraph: {
    type: 'website',
    url: 'https://textscan.vercel.app/',
    site_name: 'textscan.app'
  }
}

export default config
