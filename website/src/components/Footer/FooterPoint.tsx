import styles from '../../styles/modules/Footer.module.scss'

import { FC } from 'react'
import { Point } from '@components'
import clsx from 'clsx'

import { FooterPointProps } from './Footer.model'

export const FooterPoint: FC<FooterPointProps> = (props) => {
    const { children, className } = props
    return (
        <div className={clsx([styles.pointWrapper, className])}>
            <Point className={styles.footerPoint} />
            {children}
        </div>
    )
}