import styles from '../../styles/modules/PictureHeader.module.scss'

import { FC } from 'react'
import { Divider, Typography } from '@lukasbriza/lbui-lib'
import Image from 'next/image'

import { PictureHeaderProps } from './PictureHeader.model'

export const PictureHeader: FC<PictureHeaderProps> = (props) => {
    return (
        <section className={styles.wrapper}>
            <Divider className={styles.topDivider} depth={4} />
            <Image
                src={props.src}
                alt={props.alt ? props.alt : props.text}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                quality={100}
            />
            <div className={styles.layer}></div>
            <Typography type="h2" className={styles.header} size="medium">{props.text}</Typography>
            <Divider className={styles.bottomDivider} depth={4} />
        </section>
    )
}