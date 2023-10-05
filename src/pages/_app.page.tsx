import { globalStyles } from '@/styles/global'
import { Roboto } from 'next/font/google'
import type { AppProps } from 'next/app'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'cyrillic', 'latin'],
  display: 'swap',
})

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  )
}
