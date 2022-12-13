import services from '@assets/serviceHeader.webp'
import demolition from '@assets/demolition.webp'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PictureHeader, ServiceCard, DynamicHead } from '@components'
import { Typography, Paper } from '@lukasbriza/lbui-lib'
import { siteMetaData } from '../src/config/siteMetadata'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { routes } from '../src/config/routes'
import { useContext, useEffect } from 'react';
import { StylesContext } from './_app';

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const Services: NextPage = () => {
    const { t } = useTranslation()
    const styles = useContext(StylesContext).services
    const router = useRouter()

    useEffect(() => {
        router.prefetch(routes.demolition)
        router.prefetch(routes.communications)
        router.prefetch(routes.sewersconstruction)
        router.prefetch(routes.transport)
        router.prefetch(routes.machinerent)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <DynamicHead
                title={t('head.services.title')}
                description={t('head.services.description')}
                canonicalUrl={siteMetaData.siteUrl + '/services'}
                ogType="website"
            />
            <section className={styles.services} data-route={routes.services}>
                <PictureHeader
                    src={services}
                    alt={t('pages.services.headerAlt')}
                    text={t('pages.services.pictureHeader')}
                />
                <Paper className={styles.textWrapper} elevation={4} square>
                    <Typography type="body1" className={styles.servicesText}>
                        {t('pages.services.subtitle1')}<br /><br />
                        {t('pages.services.subtitle2')}
                    </Typography>
                </Paper>
                <section className={styles.servicesWrapper}>
                    <ServiceCard
                        className={styles.demolition}
                        src={'/assets/demolition.webp'}
                        text={t('pages.services.service1')}
                        url={routes.demolition}
                    />
                    <ServiceCard
                        className={styles.communications}
                        src={'/assets/buildingCommunications.webp'}
                        text={t('pages.services.service2')}
                        url={routes.communications}
                    />
                    <ServiceCard
                        className={styles.canalizations}
                        src={'/assets/sewersConstruction.webp'}
                        text={t('pages.services.service3')}
                        url={routes.sewersconstruction}
                    />
                    <ServiceCard
                        className={styles.transposrtation}
                        src={'/assets/transport.webp'}
                        text={t('pages.services.service4')}
                        url={routes.transport}
                    />
                    <ServiceCard
                        className={styles.carrent}
                        src={'/assets/machineRent.webp'}
                        text={t('pages.services.service5')}
                        url={routes.machinerent}
                    />
                </section>
            </section>
        </>
    )
}

export default Services