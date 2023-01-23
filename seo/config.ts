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
    site_name: 'textscan.app'
  }
}

export default config
