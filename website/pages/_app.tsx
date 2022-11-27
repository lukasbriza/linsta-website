import '../src/styles/global.scss'
import '../src/styles/modules/SwiperGlobal.scss'
import 'swiper/css';
import 'swiper/css/pagination';

import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { Footer, Header, Menu, Layout, SwiperProvider } from '@components'
import { TypographyProvider } from '@lukasbriza/lbui-lib'
import { menuConfig } from '../src/config/menuConfig'
import { headerConfig } from '../src/config/headerConfig'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TypographyProvider>
      <SwiperProvider>
        <Layout
          header={<Header leftItems={headerConfig.leftItems} rightItems={headerConfig.rightItems} />}
          menu={<Menu items={menuConfig.items} />}
          footer={<Footer />}
        >
          <Component {...pageProps} />
        </Layout>
      </SwiperProvider>
    </TypographyProvider>
  )
}

export default appWithTranslation(MyApp)
