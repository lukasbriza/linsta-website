import '../src/styles/global.scss'

import type { AppProps } from 'next/app'
import { Layout } from '../src/components/Layout/Layout'
import { Menu } from '../src/components/Menu/Menu'
import { Header } from '../src/components/Header/Header'
import { Footer } from '../src/components/Footer/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout
      header={<Header />}
      menu={<Menu />}
      footer={<Footer />}
    >
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
