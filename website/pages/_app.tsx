import '../src/styles/global.scss'

import type { AppProps } from 'next/app'
import { Layout } from '../src/components/Layout/Layout'
import { Menu } from '../src/components/Menu/Menu'
import { Header } from '../src/components/Header/Header'
import { Footer } from '../src/components/Footer/Footer'

import { menuConfig } from '../src/config/menuConfig'
import { headerConfig } from '../src/config/headerConfig'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout
      header={<Header leftItems={headerConfig.leftItems} rightItems={headerConfig.rightItems} />}
      menu={<Menu items={menuConfig.items} />}
      footer={<Footer />}
    >
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
