import styles from '../../styles/modules/ServiceCard.module.scss'

import { FC } from 'react'
import { PictureCard, Typography } from '@lukasbriza/lbui-lib'

import { ServiceCardProps, CardBodyProps } from './ServiceCard.model'
import clsx from 'clsx'
import Link from 'next/link'

export const ServiceCard: FC<ServiceCardProps> = (props) => {
    const { src, text, className, url } = props

    return (
        <PictureCard
            src={src}
            square={true}
            className={clsx([styles.card, className])}
            body={<CardBody text={text} url={url} />}
        />
    )
}

const CardBody: FC<CardBodyProps> = (props) => {
    const { text, url } = props

    return (
        <div className={styles.body}>
            <div className={styles.layer}></div>
            <Typography
                type="h6"
                size="medium"
                variant={["bold"]}
                className={styles.text}
            >
                {text}
            </Typography>
            <Link href={url} className={styles.button}>
                <div className={styles.button}>
                    <Typography type="buttonText" variant={["bold"]} size="large">{"Více"}</Typography>
                </div>
            </Link>
            <div className={clsx([styles.line, styles.leftTopTop])}></div>
            <div className={clsx([styles.line, styles.leftTopLeft])}></div>
            <div className={clsx([styles.line, styles.rightoBottomBottom])}></div>
            <div className={clsx([styles.line, styles.rightoBottomRight])}></div>
            <div className={clsx([styles.line, styles.top])}></div>
            <div className={clsx([styles.line, styles.left])}></div>
            <div className={clsx([styles.line, styles.bottom])}></div>
            <div className={clsx([styles.line, styles.right])}></div>
        </div>
    )
}