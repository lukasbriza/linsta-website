import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPage } from 'next'
import Image from 'next/image'
import { badgeConfig } from '../src/config/badgeConfig'
import { siteMetaData } from '../src/config/siteMetadata';
import { Badge, DynamicHead, FadeIn } from '@components'
import { Typography } from '@lukasbriza/lbui-lib'
import { routes } from '../src/config/routes'
import background from '@assets/home.webp'
import clsx from 'clsx';
import { StylesContext } from './_app';
import { useContext } from 'react';
import { useLogoContext, useTransitionContext } from '@hooks';

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

const Home: NextPage = () => {
  const { t } = useTranslation()
  const { animated } = useLogoContext()
  const { transitioning } = useTransitionContext()
  const styles = useContext(StylesContext).home
  return (
    <>
      <DynamicHead
        title={t('head.home.title')}
        description={t('head.home.description')}
        canonicalUrl={siteMetaData.siteUrl}
        ogType="website"
      />
      <section className={styles.home} data-route={routes.home}>
        <Image
          src={background}
          alt="Home image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority={true}
        />
        <div className={clsx([styles.layer, 'layer_NM'])}>
          <section className={styles.hero}>
            <section className={styles.heroText}>

              <FadeIn canAnimate={animated && !transitioning}>
                <Typography
                  type="h1"
                  variant={["bold"]}
                  size="large"
                >
                  {t('pages.home.header')}
                </Typography>
              </FadeIn>

            </section>
            <nav className={clsx([styles.badgeSection, 'badgeSection_NM'])}>

              {badgeConfig.map((item, index) => {
                return (
                  <FadeIn canAnimate={animated && !transitioning} delay={0.5} stagger={index * 0.2} key={index}>
                    <Badge
                      icon={item.icon}
                      text={t(`pages.home.${item.text}`)}
                      url={item.url}
                    />
                  </FadeIn>
                )
              })}

            </nav>
          </section>
        </div>
      </section>
    </>
  )
}

export default Home
