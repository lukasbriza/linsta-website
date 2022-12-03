import styles from '../src/styles/pages/Services.module.scss'
import services from '@assets/serviceHeader.webp'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PictureHeader, ServiceCard, DynamicHead } from '@components'
import { Typography, Paper } from '@lukasbriza/lbui-lib'
import { siteMetaData } from '../src/config/siteMetadata'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { routes } from '../src/config/routes'

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
//TODO: PREFETCH
const Services: NextPage = () => {
    const { t } = useTranslation()
    const router = useRouter()
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
                <Paper className={styles.textWrapper} elevation={4} square>
                    <Typography type="body1" className={styles.servicesText}>
                        {t('pages.services.subtitle')}
                    </Typography>
                </Paper>
                <section className={styles.servicesWrapper}>
                    <ServiceCard
                        className={styles.demolition}
                        src={'assets/demolition.webp'}
                        text={t('pages.services.service1')}
                        onClick={() => { router.push(routes.demolition) }}
                    />
                    <ServiceCard
                        className={styles.communications}
                        src={'assets/buildingCommunications.webp'}
                        text={t('pages.services.service2')}
                        onClick={() => { router.push(routes.communications) }}
                    />
                    <ServiceCard
                        className={styles.canalizations}
                        src={'assets/sewersConstruction.webp'}
                        text={t('pages.services.service3')}
                        onClick={() => { router.push(routes.sewersconstruction) }}
                    />
                    <ServiceCard
                        className={styles.transposrtation}
                        src={'assets/transport.webp'}
                        text={t('pages.services.service4')}
                        onClick={() => { router.push(routes.transport) }}
                    />
                    <ServiceCard
                        className={styles.carrent}
                        src={'assets/machineRent.webp'}
                        text={t('pages.services.service5')}
                        onClick={() => { router.push(routes.machinerent) }}
                    />
                </section>
            </section>
        </>
    )
}

export default Services