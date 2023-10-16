import SEO from '@/lib/seo'
import { DefaultSeo } from 'next-seo'
import '@/lib/dayjs'
import { globalStyles } from '@/styles/global'
import { Roboto } from 'next/font/google'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'cyrillic', 'latin'],
  display: 'swap',
})

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <main className={roboto.className}>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </QueryClientProvider>
  )
}
