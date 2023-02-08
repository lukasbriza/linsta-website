import styles from '../../styles/modules/MechanizationCard.module.scss'

import { FC, useState, useEffect } from "react"
import clsx from 'clsx'
import Image from 'next/image'
import { getImg } from '@fetchers'
import { Paper } from '@lukasbriza/lbui-lib'
import { MechanizationCardProps } from './MechanizationCard.model'
import { useTranslation } from 'next-i18next'

export const MechanizationCard: FC<MechanizationCardProps> = (props) => {
    const { t } = useTranslation()
    const { name, src, label, capacity, price, type } = props

    const [loading, setLoading] = useState<boolean>(true)
    const [img, setImg] = useState<string>('')

    useEffect(() => {
        getImg(src).then((result => {
            const { sucess, data } = result
            const blob = URL.createObjectURL(new Blob([data], { type: "image/svg+xml" }))
            sucess && data && setImg(blob)
            setLoading(false)
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Paper square={true} className={styles.card}>
            <div className={clsx([styles.sq1, styles.sq])}>
                <h6 className={styles.header}>{name}</h6>
                <section>
                    {
                        loading ?
                            <>Loading</> :
                            <Image className={styles.image} src={img} alt={name} width="200px" height="60px" objectFit="contain" />
                    }
                </section>
            </div>
            <div className={clsx([styles.sq2, styles.sq])}>
                <h6 className={styles.header}>{t('pages.mechanization.mechaniztionCard.header1')}</h6>
                <div>{label}</div>
            </div>
            <div className={clsx([styles.sq3, styles.sq])}>
                <h6 className={styles.header}>{t('pages.mechanization.mechaniztionCard.header2')}</h6>
                <div>{capacity}</div>
            </div>
            <div className={clsx([styles.sq4, styles.sq])}>
                <h6 className={styles.header}>{t('pages.mechanization.mechaniztionCard.header3')}</h6>
                <div>
                    {t('pages.mechanization.mechaniztionCard.from')}
                    {` ${price} `}
                    {type === "SM" ? t('pages.mechanization.mechaniztionCard.currency2') : t('pages.mechanization.mechaniztionCard.currency')}
                </div>
            </div>
            <div className={clsx([styles.underliner1, styles.underliner])}></div>
            <div className={clsx([styles.underliner2, styles.underliner])}></div>
            <div className={clsx([styles.underliner3, styles.underliner])}></div>
            <div className={clsx([styles.underliner4, styles.underliner])}></div>
        </Paper>
    )
}