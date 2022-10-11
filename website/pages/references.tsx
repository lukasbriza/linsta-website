import styles from '../src/styles/pages/References.module.scss'
import references from '@assets/referencesHeader.webp'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPage } from 'next'
import { PictureHeader, ReferenceCard, DynamicHead } from '@components'
import { siteMetaData } from '../src/config/siteMetadata'

import { data } from '../src/dummydata'

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const References: NextPage = () => {
    const { t } = useTranslation()

    return (
        <>
            <DynamicHead
                title={t('head.references.title')}
                description={t('head.references.description')}
                canonicalUrl={siteMetaData.siteUrl + '/references'}
                ogType="website"
            />
            <section className={styles.references}>
                <PictureHeader
                    src={references}
                    alt={t('pages.references.headerAlt')}
                    text={t('pages.references.pictureHeader')}
                />
                <section className={styles.referencesWrapper}>
                    {data.map((item, index) => {
                        return (
                            <ReferenceCard
                                key={index}
                                {...item}
                            />
                        )
                    })}
                </section>
            </section>
        </>
    )
}

export default References