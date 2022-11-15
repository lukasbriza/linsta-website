import styles from '../src/styles/pages/Services.module.scss'
import services from '@assets/serviceHeader.webp'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PictureHeader, ServiceCard, DynamicHead } from '@components'
import { Typography } from '@lukasbriza/lbui-lib'
import { siteMetaData } from '../src/config/siteMetadata'
import type { NextPage } from 'next'

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const Services: NextPage = () => {
    const { t } = useTranslation()

    return (
        <>
            <DynamicHead
                title={t('head.services.title')}
                description={t('head.services.description')}
                canonicalUrl={siteMetaData.siteUrl + '/services'}
                ogType="website"
            />
            <section className={styles.services}>
                <PictureHeader
                    src={services}
                    alt={t('pages.services.headerAlt')}
                    text={t('pages.services.pictureHeader')}
                />
                <Typography type="body1" className={styles.servicesText}>
                    {t('pages.services.subtitle')}
                </Typography>
                <section className={styles.servicesWrapper}>
                    <ServiceCard className={styles.demolition} src={'assets/demolition.webp'} text={t('pages.services.service1')} />
                    <ServiceCard className={styles.communications} src={'assets/buildingCommunications.webp'} text={t('pages.services.service2')} />
                    <ServiceCard className={styles.canalizations} src={'assets/sewersConstruction.webp'} text={t('pages.services.service3')} />
                    <ServiceCard className={styles.transposrtation} src={'assets/transport.webp'} text={t('pages.services.service4')} />
                    <ServiceCard className={styles.carrent} src={'assets/machineRent.webp'} text={t('pages.services.service5')} />
                </section>
            </section>
        </>
    )
}

export default Services