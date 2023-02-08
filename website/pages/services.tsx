import services from '@assets/serviceHeader.webp'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PictureHeader, ServiceCard, DynamicHead, FadeIn } from '@components'
import { Typography } from '@lukasbriza/lbui-lib'
import { siteMetaData } from '../src/config/siteMetadata'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { routes } from '../src/config/routes'
import { useContext, useEffect } from 'react';
import { StylesContext } from './_app';
import { useLogoContext, useTransitionContext } from '@hooks';

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const Services: NextPage = () => {
    const { t } = useTranslation()
    const { animated } = useLogoContext()
    const { transitioning } = useTransitionContext()
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
                <FadeIn canAnimate={animated && !transitioning} className={styles.demolition}>
                    <Typography type="body1" className={styles.servicesText}>
                        {t('pages.services.subtitle1')}<br /><br />
                        {t('pages.services.subtitle2')}
                    </Typography>
                </FadeIn>
                <section className={styles.servicesWrapper}>
                    <FadeIn canAnimate={animated && !transitioning} className={styles.demolition} delay={0.5}>
                        <ServiceCard
                            src={'/assets/demolition.webp'}
                            text={t('pages.services.service1')}
                            url={routes.demolition}
                        />
                    </FadeIn>
                    <FadeIn canAnimate={animated && !transitioning} className={styles.communications} delay={0.5}>
                        <ServiceCard
                            src={'/assets/buildingCommunications.webp'}
                            text={t('pages.services.service2')}
                            url={routes.communications}
                        />
                    </FadeIn>
                    <FadeIn canAnimate={animated && !transitioning} className={styles.canalizations} delay={0.5}>
                        <ServiceCard
                            className={styles.canalizations}
                            src={'/assets/sewersConstruction.webp'}
                            text={t('pages.services.service3')}
                            url={routes.sewersconstruction}
                        />
                    </FadeIn>
                    <FadeIn canAnimate={animated && !transitioning} className={styles.transposrtation} delay={0.5}>
                        <ServiceCard
                            className={styles.transposrtation}
                            src={'/assets/transport.webp'}
                            text={t('pages.services.service4')}
                            url={routes.transport}
                        />
                    </FadeIn>
                    <FadeIn canAnimate={animated && !transitioning} className={styles.carrent} delay={0.5}>
                        <ServiceCard
                            className={styles.carrent}
                            src={'/assets/machineRent.webp'}
                            text={t('pages.services.service5')}
                            url={routes.machinerent}
                        />
                    </FadeIn>
                </section>
            </section>
        </>
    )
}

export default Services
