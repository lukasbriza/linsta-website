import styles from '../../src/styles/pages/ServiceName.module.scss'

import { useRouter } from "next/router"
import { FC, useRef, useState } from "react"
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPage } from "next";
import Image from 'next/image'
import { DynamicHead } from "@components";
import { Props, Typography, Underliner } from '@lukasbriza/lbui-lib'
import { siteMetaData } from "src/config/siteMetadata";
import clsx from 'clsx';
import Link from 'next/link';
import { useRedirect } from '@hooks';

type ServiceNames = 'demolition' | 'communications' | 'machinerent' | 'sewersconstruction' | 'transport'
type ArrowProps = {
    className?: string;
    onClick?: () => void;
}
type MainContentProps = {
    route: ServiceNames
} & Props<HTMLDivElement>

const ids: { id: number, serviceName: ServiceNames }[] = [
    { id: 0, serviceName: "demolition" },
    { id: 1, serviceName: "communications" },
    { id: 2, serviceName: "machinerent" },
    { id: 3, serviceName: "sewersconstruction" },
    { id: 4, serviceName: "transport" }
]

const getActualId = (serviceName: ServiceNames) => {
    return ids.filter(value => value.serviceName === serviceName)[0].id
}

export const getStaticPaths = async () => {
    return {
        paths: [
            "/services/demolition",
            "/services/communications",
            "/services/machinerent",
            "/services/sewersconstruction",
            "/services/transport"
        ],
        fallback: true
    }
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const ServiceDetail: NextPage = () => {
    const router = useRouter()
    const redirect = useRedirect()
    const { t } = useTranslation()
    const serviceName = router.query.serviceName as ServiceNames
    const actualIndex = getActualId(serviceName)

    const handleNext = () => {
        if ((ids.length - 1) === actualIndex) {
            redirect({ route: ids[0].serviceName })
            return
        }
        redirect({ route: ids[actualIndex + 1].serviceName })
    }

    const handlePrevious = () => {
        if (actualIndex === 0) {
            redirect({ route: ids[ids.length - 1].serviceName })
            return
        }
        redirect({ route: ids[actualIndex - 1].serviceName })
    }



    return (
        <>
            <DynamicHead
                title={t(`head.${serviceName}.title`)}
                description={t('head.services.description')}
                canonicalUrl={siteMetaData.siteUrl + '/services/' + serviceName}
                ogType="website"
            />
            <section className={styles.serviceName}>
                <section className={styles.content}>
                    <Arrow onClick={handlePrevious} />
                    <MainContent route={serviceName} className={styles.mainWrapper} />
                    <Arrow onClick={handleNext} />
                </section>
                <section className={styles.contactBanner}>
                    <Typography className={styles.text} type={"h6"} variant={["bold"]}>{t("pages.serviceName.banner")}</Typography>
                    <Link href="/contact">
                        <div className={styles.button}>
                            <p>{t("pages.serviceName.button")}</p>
                        </div></Link>
                </section>
            </section>
        </>)
}

const Arrow: FC<ArrowProps> = (props) => {
    return (
        <div className={clsx([props.className, styles.arrowWrapper])} onClick={props.onClick}>
            <div className={clsx([styles.line1, styles.line])}></div>
            <div className={clsx([styles.line2, styles.line])}></div>
        </div>
    )
}

const MainContent: FC<MainContentProps> = (props) => {
    const { route, ...rest } = props
    const { t } = useTranslation()
    const imageSrc = "/assets/demolition.webp"

    return (
        <div {...rest}>
            <div className={styles.layer1}></div>
            <div className={styles.layer2}></div>
            <div className={styles.main}>
                <div className={styles.mainServiceInformation}>
                    <Underliner underlinerClass={styles.underliner}>
                        <Typography className={styles.header} type={"h6"} variant={["bold"]}>{t(`pages.serviceName.content.header.${route}`)}</Typography>
                    </Underliner>
                    <Typography type={"body1"}>{t(`pages.serviceName.content.main.${route}`)}</Typography>
                </div>
                <div className={styles.secondaryServiceInformation}>
                    <Typography type={"body1"} >
                        {t(`pages.serviceName.content.secondary.${route}`)}
                    </Typography>
                </div>
                <div className={styles.image}>
                    <Image
                        src={imageSrc}
                        alt={"Service image"}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center" />
                </div>
            </div>
        </div>
    )
}

export default ServiceDetail