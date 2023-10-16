import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.url.ie/',
    siteName: 'Ignite Call',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
}

export default config
