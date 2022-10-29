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
                        header="Pavel Novotný"
                        subtitle="role ve firmě"
                        phone='+420 774 876 504'
                        mail="name@linstastavebni.cz"
                    />
                    <StatutarCard
                        header="Pavel Novotný"
                        subtitle="role ve firmě"
                        phone='+420 774 876 504'
                        mail="name@linstastavebni.cz"
                    />
                    <StatutarCard
                        header="Pavel Novotný"
                        subtitle="role ve firmě"
                        phone='+420 774 876 504'
                        mail="name@linstastavebni.cz"
                    />
                </section>
                <section className={styles.map}>
                    <Divider depth={4} className={styles.divider} />
                    <div className={styles.flag}>
                        <div className={styles.logoWrapper}>
                            <Logo fill2={"#fff"} />
                        </div>
                        <div className={styles.typographyWrapper}>
                            <Typography type="body1" size="small">{"Višňová 1367"}</Typography>
                            <Typography type="body1" size="small">{"Hořovice 268 01, Česká republika"}</Typography>
                        </div>
                        <a className={styles.link} href={googleMap}>{"Zobrazit na GoogleMaps"}</a>
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