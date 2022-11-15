import styles from '../src/styles/pages/Contact.module.scss'
import contact from '@assets/contactHeader.webp'
import { googleMap } from '../src/config/googleMap'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PictureHeader, DynamicHead, StatutarCard, Logo, Form } from '@components'
import { Typography, Divider, Underliner } from '@lukasbriza/lbui-lib'
import { siteMetaData } from '../src/config/siteMetadata'
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

    return (
        <>
            <DynamicHead
                title={t('head.contact.title')}
                description={t('head.contact.description')}
                canonicalUrl={siteMetaData.siteUrl + '/contact'}
                ogType="website"
            />
            <section className={styles.contact}>
                <PictureHeader
                    src={contact}
                    alt={t('pages.contact.headerAlt')}
                    text={t('pages.contact.pictureHeader')}
                />
                <section className={styles.statutars}>
                    <StatutarCard
                        header={t('pages.contact.contact1.name')}
                        subtitle={t('pages.contact.contact1.role')}
                        phone={t('pages.contact.contact1.tel')}
                        mail={t('pages.contact.contact1.email')}
                    />
                    <StatutarCard
                        header={t('pages.contact.contact2.name')}
                        subtitle={t('pages.contact.contact2.role')}
                        phone={t('pages.contact.contact2.tel')}
                        mail={t('pages.contact.contact2.email')}
                    />
                    <StatutarCard
                        header={t('pages.contact.contact3.name')}
                        subtitle={t('pages.contact.contact3.role')}
                        phone={t('pages.contact.contact3.tel')}
                        mail={t('pages.contact.contact3.email')}
                    />
                </section>
                <section className={styles.map}>
                    <Divider depth={4} className={styles.divider} />
                    <div className={styles.flag}>
                        <div className={styles.logoWrapper}>
                            <Logo fill2={"#fff"} />
                        </div>
                        <div className={styles.typographyWrapper}>
                            <Typography type="body1" size="small">{t('pages.contact.map.line1')}</Typography>
                            <Typography type="body1" size="small">{t('pages.contact.map.line2')}</Typography>
                        </div>
                        <a className={styles.link} href={googleMap}>{t('pages.contact.map.link')}</a>
                    </div>
                    <Map />
                    <Divider depth={4} className={styles.divider} />
                </section>
                <section className={styles.form}>
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
                    <Form />
                </section>

            </section>
        </>
    )
}

export default Contact