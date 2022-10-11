import '../src/styles/global.scss'

import nextI18NextConfig from '../next-i18next.config.js'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { Footer, Header, Menu, Layout } from '@components'
import { TypographyProvider } from '@lukasbriza/lbui-lib'
import { menuConfig } from '../src/config/menuConfig'
import { headerConfig } from '../src/config/headerConfig'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TypographyProvider>
      <Layout
        header={<Header leftItems={headerConfig.leftItems} rightItems={headerConfig.rightItems} />}
        menu={<Menu items={menuConfig.items} />}
        footer={<Footer />}
      >
        <Component {...pageProps} />
      </Layout>
    </TypographyProvider>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
