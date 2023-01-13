import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  title: 'LiveText',
  description: 'LiveText for getting text content from your images',
  defaultTitle: 'LiveText',
  openGraph: {
    type: 'website',
    url: 'https://livetext.vercel.app/',
    site_name: 'LiveText.app'
  }
}

export default config
