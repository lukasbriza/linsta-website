import references from '@assets/referencesHeader.webp'
import 'swiper/swiper-bundle.css';

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPage } from 'next'
import { PictureHeader, ReferenceCard, DynamicHead, FadeIn } from '@components'
import { siteMetaData } from '../src/config/siteMetadata'
import { connectDB, DatabaseError, findAll, handleServerSideError, Reference as Model, ReferenceObjectExt } from '@utils';
import { routes } from '../src/config/routes'
import { StylesContext } from './_app';
import { useContext } from 'react';
import { useLogoContext, useTransitionContext } from '@hooks';

export async function getStaticProps({ locale }: { locale: string }) {
    const returnProps = {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            data: JSON.stringify([])
        },
    }
    const db = await connectDB();
    const dbHandle = handleServerSideError(DatabaseError, db, returnProps)
    if (dbHandle) return dbHandle

    const references = await findAll<ReferenceObjectExt>(Model)
    const referencesHandle = handleServerSideError(DatabaseError, references, returnProps)
    if (referencesHandle) return referencesHandle

    const data = references as ReferenceObjectExt[]

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            data: JSON.stringify(data)
        }
    }
}

type ReferencesProps = {
    data: string
}

const References: NextPage<ReferencesProps> = (props) => {
    const { t } = useTranslation()
    const styles = useContext(StylesContext).reference
    const { animated } = useLogoContext()
    const { transitioning } = useTransitionContext()
    const data = JSON.parse(props.data) as ReferenceObjectExt[] | []

    return (
        <>
            <DynamicHead
                title={t('head.references.title')}
                description={t('head.references.description')}
                canonicalUrl={siteMetaData.siteUrl + '/references'}
                ogType="website"
            />
            <section className={styles.references} data-route={routes.references}>
                <PictureHeader
                    src={references}
                    alt={t('pages.references.headerAlt')}
                    text={t('pages.references.pictureHeader')}
                />
                <section className={styles.referencesWrapper}>
                    {data.map((item, index) => {
                        return (
                            <FadeIn canAnimate={animated && !transitioning} className={styles.demolition} key={index}>
                                <ReferenceCard
                                    src={item.pictures}
                                    header={item.name}
                                    place={item.place}
                                    realization={item.realization}
                                    detail={item.detail}
                                />
                            </FadeIn>
                        )
                    })}
                </section>
            </section>
        </>
    )
}

export default References