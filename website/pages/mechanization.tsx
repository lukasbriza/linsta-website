import styles from '../src/styles/pages/Mechanization.module.scss'
import mechanization from '@assets/mechanizationHeader.webp'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPage } from 'next'
import { MechanizationCard, DynamicHead, PictureHeader } from '@components'
import { Typography, Underliner } from '@lukasbriza/lbui-lib'
import { siteMetaData } from '../src/config/siteMetadata'
import { mechanizationData } from '../src/dummydata'

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}


const Mechanization: NextPage = () => {
    const { t } = useTranslation()

    return (
        <>
            <DynamicHead
                title={t('head.mechanization.title')}
                description={t('head.mechanization.description')}
                canonicalUrl={siteMetaData.siteUrl + '/mechanization'}
                ogType="website"
            />
            <section className={styles.mechanization}>
                <PictureHeader
                    src={mechanization}
                    alt={t('pages.mechanization.headerAlt')}
                    text={t('pages.mechanization.pictureHeader')}
                />
                <Underliner underlinerClass={styles.underliner} className={styles.typography}>
                    <Typography
                        type="h4"
                        size="small"
                        variant={["bold"]}
                        className={styles.header}
                    >
                        {t('pages.mechanization.header1')}
                    </Typography>
                </Underliner>
                <div className={styles.cardSection}>
                    {mechanizationData.map((value, index) => {
                        return (
                            <MechanizationCard
                                key={index}
                                src={value.src}
                                name={value.name}
                                indication={value.indication}
                                capacity={value.capacity}
                                price={value.price}
                            />
                        )
                    })}
                </div>
                <Underliner underlinerClass={styles.underliner} className={styles.typography}>
                    <Typography
                        type="h4"
                        size="small"
                        variant={["bold"]}
                        className={styles.header}
                    >
                        {t('pages.mechanization.header2')}
                    </Typography>
                </Underliner>
                <div className={styles.cardSection}>
                    {mechanizationData.map((value, index) => {
                        return (
                            <MechanizationCard
                                key={index}
                                src={value.src}
                                name={value.name}
                                indication={value.indication}
                                capacity={value.capacity}
                                price={value.price}
                            />
                        )
                    })}
                </div>
                <Underliner underlinerClass={styles.underliner} className={styles.typography}>
                    <Typography
                        type="h4"
                        size="small"
                        variant={["bold"]}
                        className={styles.header}
                    >
                        {t('pages.mechanization.header3')}
                    </Typography>
                </Underliner>
                <div className={styles.cardSection}>
                    {mechanizationData.map((value, index) => {
                        return (
                            <MechanizationCard
                                key={index}
                                src={value.src}
                                name={value.name}
                                indication={value.indication}
                                capacity={value.capacity}
                                price={value.price}
                            />
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default Mechanization