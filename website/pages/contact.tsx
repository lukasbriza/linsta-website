import contact from '@assets/contactHeader.webp'
import { googleMap } from '../src/config/googleMap'

import { useContext } from 'react';
import { StylesContext } from './_app';
import { useLogoContext, useTransitionContext } from '@hooks';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PictureHeader, DynamicHead, StatutarCard, Logo, Form, LogoPlacable, FadeIn } from '@components'
import { Typography, Divider, Underliner } from '@lukasbriza/lbui-lib'
import { siteMetaData } from '../src/config/siteMetadata'
import { routes } from '../src/config/routes'
import type { NextPage } from 'next'


//NOT SSR COMP
import Map from '../src/components/Map'

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const Contact: NextPage = () => {
    const { t } = useTranslation()
    const styles = useContext(StylesContext).contact
    const { animated } = useLogoContext()
    const { transitioning } = useTransitionContext()

    return (
        <>
            <DynamicHead
                title={t('head.contact.title')}
                description={t('head.contact.description')}
                canonicalUrl={siteMetaData.siteUrl + '/contact'}
                ogType="website"
            />
            <section className={styles.contact} data-route={routes.contact}>
                <PictureHeader
                    src={contact}
                    alt={t('pages.contact.headerAlt')}
                    text={t('pages.contact.pictureHeader')}
                />
                <section className={styles.statutars}>
                    <FadeIn canAnimate={animated && !transitioning}>
                        <StatutarCard
                            header={t('pages.contact.contact1.name')}
                            phone={t('pages.contact.contact1.tel')}
                            mail={t('pages.contact.contact1.email')}
                        />
                    </FadeIn>
                    <FadeIn canAnimate={animated && !transitioning} delay={0.3}>
                        <StatutarCard
                            header={t('pages.contact.contact2.name')}
                            phone={t('pages.contact.contact2.tel')}
                            mail={t('pages.contact.contact2.email')}
                        />
                    </FadeIn>
                    <FadeIn canAnimate={animated && !transitioning} delay={0.3}>
                        <StatutarCard
                            header={t('pages.contact.contact3.name')}
                            phone={t('pages.contact.contact3.tel')}
                            mail={t('pages.contact.contact3.email')}
                        />
                    </FadeIn>
                </section>
                <section className={styles.map}>
                    <Divider depth={4} className={styles.divider} />
                    <div className={styles.flag}>
                        <div className={styles.logoWrapper}>
                            <FadeIn canAnimate={animated && !transitioning} delay={0.3}>
                                <LogoPlacable />
                            </FadeIn>
                        </div>
                        <div className={styles.typographyWrapper}>
                            <FadeIn canAnimate={animated && !transitioning} delay={0.3}>
                                <Typography type="body1" size="small">{t('pages.contact.map.line1')}</Typography>
                            </FadeIn>
                            <FadeIn canAnimate={animated && !transitioning} delay={0.3}>
                                <Typography type="body1" size="small">{t('pages.contact.map.line2')}</Typography>
                            </FadeIn>
                        </div>
                        <a className={styles.link} href={googleMap}>{t('pages.contact.map.link')}</a>
                    </div>
                    <Map />
                    <Divider depth={4} className={styles.divider} />
                </section>
                <section className={styles.form}>
                    <FadeIn canAnimate={animated && !transitioning} delay={0.3}>
                        <Underliner underlinerClass={styles.underliner} className={styles.typography}>
                            <Typography
                                type="h4"
                                size="small"
                                variant={["bold"]}
                                className={styles.header}
                            >
                                {t('pages.contact.form.header')}
                            </Typography>
                        </Underliner>
                    </FadeIn>
                    <FadeIn canAnimate={animated && !transitioning} delay={0.3}>
                        <Form />
                    </FadeIn>
                </section>

            </section>
        </>
    )
}

export default Contact