import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  title: 'TextScan',
  description: 'textscan for getting text content from your images',
  defaultTitle: 'TextScan',
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/icons/favicon.ico'
    }
  ],
  openGraph: {
    type: 'website',
    url: 'https://textscan.vercel.app/',
    site_name: 'textscan.app',
    images: [
      {
        url: '/img/banner.png',
        width: 1920,
        height: 1080,
        type: 'image/png'
      }
    ]
  }
}

export default config
