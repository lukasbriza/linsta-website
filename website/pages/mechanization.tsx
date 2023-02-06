import mechanization from '@assets/mechanizationHeader.webp'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPage } from 'next'
import { findByType, connectDB, DatabaseError, findAll, Mechanization as Model, MechanizationObjectExt, handleServerSideError } from '@utils'
import { MechanizationCard, DynamicHead, PictureHeader, FadeIn } from '@components'
import { Typography, Underliner } from '@lukasbriza/lbui-lib'
import { siteMetaData } from '../src/config/siteMetadata'
import { routes } from '../src/config/routes'
import { StylesContext } from './_app';
import { useContext } from 'react';
import { useLogoContext, useTransitionContext } from '@hooks';

export async function getServerSideProps({ locale }: { locale: string }) {
    const returnProps = {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            data: null
        },
    };

    const db = await connectDB();
    const dbHandle = handleServerSideError(DatabaseError, db, returnProps)
    if (dbHandle) return dbHandle

    const mechanizations = await findAll<MechanizationObjectExt>(Model);
    const mechanizationsHandle = handleServerSideError(DatabaseError, mechanizations, returnProps)
    if (mechanizationsHandle) return mechanizationsHandle

    const data = mechanizations as MechanizationObjectExt[]
    const machines = findByType(data, "M")
    const smallMachines = findByType(data, "SM")
    const cars = findByType(data, "C")

    const result = await Promise.all([machines, smallMachines, cars])

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            data: {
                machines: JSON.stringify(result[0]),
                smallMachines: JSON.stringify(result[1]),
                cars: JSON.stringify(result[2])
            }
        },
    };
}

type MechanizationProps = {
    data: {
        machines: string,
        smallMachines: string,
        cars: string
    } | null
}

const Mechanization: NextPage<MechanizationProps> = (props) => {
    const { t } = useTranslation()
    const { data } = props
    const styles = useContext(StylesContext).mechanization
    const { animated } = useLogoContext()
    const { transitioning } = useTransitionContext()

    const machines = data ? JSON.parse(data.machines) as MechanizationObjectExt[] : []
    const smallMachines = data ? JSON.parse(data.smallMachines) as MechanizationObjectExt[] : []
    const cars = data ? JSON.parse(data.cars) as MechanizationObjectExt[] : []

    return (
        <>
            <DynamicHead
                title={t('head.mechanization.title')}
                description={t('head.mechanization.description')}
                canonicalUrl={siteMetaData.siteUrl + '/mechanization'}
                ogType="website"
            />
            <section className={styles.mechanization} data-route={routes.mechanization}>
                <PictureHeader
                    src={mechanization}
                    alt={t('pages.mechanization.headerAlt')}
                    text={t('pages.mechanization.pictureHeader')}
                />
                <FadeIn canAnimate={animated && !transitioning}>
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
                </FadeIn>
                <div className={styles.cardSection}>
                    {cars.map((value, index) => {
                        return (
                            <FadeIn canAnimate={animated && !transitioning} key={index}>
                                <MechanizationCard
                                    src={value.pictures}
                                    name={value.name}
                                    label={value.label}
                                    capacity={value.capacity}
                                    price={value.price}
                                />
                            </FadeIn>
                        )
                    })}
                </div>
                <FadeIn canAnimate={animated && !transitioning}>
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
                </FadeIn>
                <div className={styles.cardSection}>
                    {machines.map((value, index) => {
                        return (
                            <FadeIn canAnimate={animated && !transitioning} key={index} delay={0.3}>
                                <MechanizationCard
                                    src={value.pictures}
                                    name={value.name}
                                    label={value.label}
                                    capacity={value.capacity}
                                    price={value.price}
                                />
                            </FadeIn>
                        )
                    })}
                </div>
                <FadeIn canAnimate={animated && !transitioning}>
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
                </FadeIn>
                <div className={styles.cardSection}>
                    {smallMachines.map((value, index) => {
                        return (
                            <FadeIn canAnimate={animated && !transitioning} key={index} delay={0.3}>
                                <MechanizationCard
                                    src={value.pictures}
                                    name={value.name}
                                    label={value.label}
                                    capacity={value.capacity}
                                    price={value.price}
                                />
                            </FadeIn>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default Mechanization