import styles from '../../src/styles/pages/ServiceName.module.scss'

import { useRouter } from "next/router"
import { gsap, Power3 } from 'gsap'
import { FC, forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react"
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPage } from "next";
import Image from 'next/image'
import { DynamicHead } from "@components";
import { Props, Typography, Underliner } from '@lukasbriza/lbui-lib'
import { siteMetaData } from "src/config/siteMetadata";
import clsx from 'clsx';
import Link from 'next/link';
import { useLogoContext, useRedirect, useTransitionContext } from '@hooks';
import { StylesContext } from '../_app';

type ServiceNames = 'demolition' | 'communications' | 'machinerent' | 'sewersconstruction' | 'transport'
type ArrowProps = {
    className?: string;
    onClick?: () => void;
}
type MainContentProps = {
    route: ServiceNames
} & Props<HTMLDivElement>

type MainContentref = {
    getRefs: { ref1: HTMLDivElement | null, ref2: HTMLDivElement | null, ref3: HTMLDivElement | null }
}
type AnRef = HTMLDivElement | null | undefined

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

const enterAnimation = (ref1: AnRef, ref2: AnRef, ref3: AnRef) => {
    const tl = gsap.timeline()
    if (ref2 && ref3 && ref1) {
        tl.to(ref3, {
            duration: 0.5,
            opacity: 1,
            ease: 'linear'
        }).to([ref1, ref2], {
            opacity: 1,
            duration: 0.250,
            stagger: 0.200,
            ease: 'linear'
        })
    }
}
const exitAnimation = (ref1: AnRef, ref2: AnRef, ref3: AnRef, cb: () => void) => {
    const tl = gsap.timeline()
    if (ref2 && ref3 && ref1) {
        tl.to([ref2, ref1], {
            delay: 0.3,
            opacity: 0,
            duration: 0.250,
            stagger: 0.150,
            ease: Power3.easeOut,
        }).to(ref3, {
            opacity: 0,
            duration: 0.50,
            ease: Power3.easeOut,
            onComplete: cb
        }, 0.7)
    }
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
    const mainRef = useRef<MainContentref>(null)
    const { t } = useTranslation()
    const styles = useContext(StylesContext).serviceName
    const serviceName = router.query.serviceName as ServiceNames
    const actualIndex = serviceName ? getActualId(serviceName) : 0
    const { animated } = useLogoContext()
    const { transitioning } = useTransitionContext()

    useEffect(() => {
        const refs = mainRef.current?.getRefs
        router.events.on('routeChangeComplete', () => { enterAnimation(refs?.ref1, refs?.ref2, refs?.ref3) })
        return () => {
            router.events.off('routeChangeComplete', () => { enterAnimation(refs?.ref1, refs?.ref2, refs?.ref3) })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (animated && !transitioning) {
            const refs = mainRef.current?.getRefs
            enterAnimation(refs?.ref1, refs?.ref2, refs?.ref3)
        }
    }, [animated, transitioning])

    const nextRedirect = () => {
        if ((ids.length - 1) === actualIndex) {
            redirect({
                route: ids[0].serviceName,
            })
            return
        }
        redirect({
            route: ids[actualIndex + 1].serviceName,
        })
    }
    const prevRedirect = () => {
        if (actualIndex === 0) {
            redirect({
                route: ids[ids.length - 1].serviceName,
            })
            return
        }
        redirect({
            route: ids[actualIndex - 1].serviceName,
        })
    }

    const handleNext = () => {
        const refs = mainRef.current?.getRefs
        exitAnimation(refs?.ref1, refs?.ref2, refs?.ref3, nextRedirect)
    }

    const handlePrevious = () => {
        const refs = mainRef.current?.getRefs
        exitAnimation(refs?.ref1, refs?.ref2, refs?.ref3, prevRedirect)
    }



    return (
        <>
            <DynamicHead
                title={t(`head.${serviceName}.title`)}
                description={t('head.services.description')}
                canonicalUrl={siteMetaData.siteUrl + '/services/' + serviceName}
                ogType="website"
            />
            <section className={styles.serviceName} data-route={router.basePath}>
                <section className={styles.content}>
                    <Arrow onClick={handlePrevious} />
                    <MainContent route={serviceName} className={styles.mainWrapper} ref={mainRef} />
                    <Arrow onClick={handleNext} />
                </section>
                <section className={styles.contactBanner}>
                    <Typography className={styles.text} type={"h6"} variant={["bold"]}>{t("pages.serviceName.banner")}</Typography>
                    <Link href="/contact">
                        <div className={styles.button}>
                            <p>{t("pages.serviceName.button")}</p>
                        </div>
                    </Link>
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

const MainContent = forwardRef<MainContentref, MainContentProps>((props, ref) => {
    const { route, ...rest } = props
    const ref1 = useRef<HTMLDivElement>(null)
    const ref2 = useRef<HTMLDivElement>(null)
    const ref3 = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()
    const imageSrc = route === "demolition" ? "/assets/demolition.webp" :
        route === "communications" ? "/assets/buildingCommunications.webp" :
            route === "machinerent" ? "/assets/machineRent.webp" :
                route === "sewersconstruction" ? "/assets/sewersConstruction.webp" :
                    "/assets/transport.webp"

    useImperativeHandle(ref, () => ({
        getRefs: {
            ref1: ref1.current,
            ref2: ref2.current,
            ref3: ref3.current
        }
    }))

    return (
        <div {...rest}>
            <div className={styles.layer1} ref={ref1}></div>
            <div className={styles.layer2} ref={ref2}></div>
            <div className={styles.main} ref={ref3}>
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
})
MainContent.displayName = 'MainContent'

export default ServiceDetail