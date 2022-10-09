import styles from '../../styles/modules/MechanizationCard.module.scss'

import { FC } from "react"
import clsx from 'clsx'
import Image from 'next/image'
import { Paper } from '@lukasbriza/lbui-lib'

import { MechanizationCardProps } from './MechanizationCard.model'

export const MechanizationCard: FC<MechanizationCardProps> = (props) => {
    const { name, src, indication, capacity, price } = props
    return (
        <Paper square={true} className={styles.card}>
            <div className={clsx([styles.sq1, styles.sq])}>
                <h6 className={styles.header}>{name}</h6>
                <Image
                    src={src}
                    width="140px"
                    height="60px"
                    alt={name}
                />
            </div>
            <div className={clsx([styles.sq2, styles.sq])}>
                <h6 className={styles.header}>Označení</h6>
                <div>{indication}</div>
            </div>
            <div className={clsx([styles.sq3, styles.sq])}>
                <h6 className={styles.header}>Nosnost</h6>
                <div>{capacity}t</div>
            </div>
            <div className={clsx([styles.sq4, styles.sq])}>
                <h6 className={styles.header}>Cena</h6>
                <div>od {price} kč/den</div>
            </div>
            <div className={clsx([styles.underliner1, styles.underliner])}></div>
            <div className={clsx([styles.underliner2, styles.underliner])}></div>
            <div className={clsx([styles.underliner3, styles.underliner])}></div>
            <div className={clsx([styles.underliner4, styles.underliner])}></div>
        </Paper>
    )
}