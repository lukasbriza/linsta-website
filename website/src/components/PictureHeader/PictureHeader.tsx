import styles from '../../styles/modules/PictureHeader.module.scss'

import { FC } from 'react'
import clsx from 'clsx'
import { Divider, Typography } from '@lukasbriza/lbui-lib'
import Image from 'next/image'

import { PictureHeaderProps } from './PictureHeader.model'

export const PictureHeader: FC<PictureHeaderProps> = (props) => {
    const { alt, text, src, className, ...rest } = props
    return (
        <section className={clsx([styles.wrapper, className])} {...rest}>
            <Divider className={styles.topDivider} depth={4} />
            <Image
                src={src}
                alt={alt ? alt : text}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                quality={100}
                priority={true}
            />
            <div className={styles.layer}></div>
            <Typography type="h2" className={styles.header} size="medium">{text}</Typography>
            <Divider className={styles.bottomDivider} depth={4} />
        </section>
    )
}