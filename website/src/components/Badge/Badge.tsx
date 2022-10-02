import styles from '../../styles/modules/Badge.module.scss'

import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRedirect } from '@hooks'
import { RoundBadge, Paper } from '@lukasbriza/lbui-lib'

import { BadgeProps } from './Badge.model'

export const Badge: FC<BadgeProps> = (props) => {
    const redirect = useRedirect()

    const Icon = (
        <div className={styles.iconWrapper}>
            <Image src={props.icon} width="75px" height="75px" alt={props.text} />
        </div>
    )
    const Text = (
        <div className={styles.textWrapper}>
            {props.text}
        </div>
    )
    return (
        <Link href={props.url}>
            <Paper className={styles.badge} elevation={10} onClick={() => redirect({ path: props.url })}>
                <RoundBadge
                    defaultNode={Icon}
                    hoverNode={Text}
                    transitionStyle={"slideTop"}
                />
            </Paper>
        </Link>
    )
}