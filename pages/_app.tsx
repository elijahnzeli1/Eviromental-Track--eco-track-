import { AppProps } from 'next/app'
import { Providers } from '@/app/Providers'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
