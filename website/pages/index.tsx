import styles from '../src/styles/pages/Home.module.scss'


import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPage } from 'next'
import Image from 'next/image'
import { badgeConfig } from '../src/config/badgeConfig'
import { siteMetaData } from '../src/config/siteMetadata';
import { Badge, DynamicHead } from '@components'
import { Typography } from '@lukasbriza/lbui-lib'

import background from '@assets/home.webp'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <DynamicHead
        title={t('head.home.title')}
        description={t('head.home.description')}
        canonicalUrl={siteMetaData.siteUrl}
        ogType="website"
      />
      <section className={styles.home}>
        <Image
          src={background}
          alt="Home image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority={true}
        />
        <div className={styles.layer}>
          <section className={styles.hero}>
            <section className={styles.heroText}>
              <Typography
                type="h1"
                variant={["bold"]}
                size="small"
              >
                {t('pages.home.header')}
              </Typography>
              <Typography
                type="subtitle1"
                size="medium"
              >
                {t('pages.home.subtitle')}
              </Typography>
            </section>
            <nav className={styles.badgeSection}>
              {badgeConfig.map((item, index) => {
                return (
                  <Badge icon={item.icon} text={t(`pages.home.${item.text}`)} url={item.url} key={index} />
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
