import styles from '../../styles/modules/Point.module.scss'

import { FC } from 'react'
import clsx from 'clsx'

import { PointProps } from './Point.model'

export const Point: FC<PointProps> = (props) => {
    const { className } = props;
    return (
        <div className={clsx([styles.point, className])}>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
        </div>
    )
}