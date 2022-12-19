import styles from '../../styles/modules/Cross.module.scss'

import clsx from "clsx";
import { FC } from "react";
import { CrossProps } from './Cross.model';

export const Cross: FC<CrossProps> = (props) => {
    const { className, ...rest } = props
    return (
        <div className={clsx([styles.crossWrapper, className])} {...rest}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
        </div>
    )
}