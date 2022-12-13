import '../src/styles/global.scss'
import '../src/styles/modules/SwiperGlobal.scss'
import 'swiper/css'
import 'swiper/css/pagination'
import '../src/config/animations'

//PAGES CRITICAL STYLES
import home from '../src/styles/pages/Home.module.scss'
import contact from '../src/styles/pages/Contact.module.scss'
import login from '../src/styles/pages/Login.module.scss'
import mechanization from '../src/styles/pages/Mechanization.module.scss'
import administration from '../src/styles/pages/Protected.module.scss'
import reference from '../src/styles/pages/References.module.scss'
import serviceName from '../src/styles/pages/ServiceName.module.scss'
import services from '../src/styles/pages/Services.module.scss'

import Router from "next/router";
import { appWithTranslation } from 'next-i18next'
import { createContext } from 'react'
import type { AppProps } from 'next/app'
import { Footer, Header, Menu, Layout, SwiperProvider, ModalHandler, Pagetransitions, TransitionLayer, LogoAnimationHandler } from '@components'
import { TypographyProvider } from '@lukasbriza/lbui-lib'
import { menuConfig } from '../src/config/menuConfig'
import { headerConfig } from '../src/config/headerConfig'

const routeChange = () => {
  const tempFix = () => {
    const allStyleElems = document.querySelectorAll('style[media="x"]');
    allStyleElems.forEach((elem) => {
      elem.removeAttribute("media");
    });
  };
  tempFix();
};
Router.events.on("routeChangeComplete", routeChange);
Router.events.on("routeChangeStart", routeChange);

const criticalStyles = { home, contact, login, mechanization, administration, reference, serviceName, services }
export const StylesContext = createContext(criticalStyles)


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <TypographyProvider>
      <ModalHandler>
        <SwiperProvider>
          <StylesContext.Provider value={criticalStyles} >
            <LogoAnimationHandler>
              <TransitionLayer />
              <Layout
                header={<Header leftItems={headerConfig.leftItems} rightItems={headerConfig.rightItems} />}
                menu={<Menu items={menuConfig.items} />}
                footer={<Footer />}
              >
                <Pagetransitions>
                  <Component {...pageProps} />
                </Pagetransitions>
              </Layout>
            </LogoAnimationHandler>
          </StylesContext.Provider>
        </SwiperProvider>
      </ModalHandler>
    </TypographyProvider >
  )
}

export default appWithTranslation(MyApp)
