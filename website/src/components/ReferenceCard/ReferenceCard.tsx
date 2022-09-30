import styles from '../../styles/modules/ReferenceCard.module.scss'

import { FC, useState, memo } from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { Card, Underliner, Typography } from '@lukasbriza/lbui-lib'

import { ReferenceCardProps } from './ReferenceCard.model'

export const ReferenceCard: FC<ReferenceCardProps> = (props) => {
    const { src, url, ...other } = props
    const [elevation, setElevation] = useState<3 | 15>(3)
    return (
        <Link href={url}>
            <Card
                onMouseEnter={() => setElevation(15)}
                onMouseLeave={() => setElevation(3)}
                elevation={elevation}
                body={<CardBody src={src} />}
                description={<CardDescription {...other} />}
                square={true}
                className={styles.card}
            />
        </Link>
    )
}

const CardBody: FC<{ src: StaticImageData }> = ({ src }) => {
    return (
        <div className={styles.cardBody}>
            <Image
                src={src}
                alt="References card background"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                quality={100}
            />
        </div>
    )
}
const CardDescription: FC<{ header: string, place: string, realization: string }> = memo(({ header, place, realization }) => {

    return (
        <div className={styles.cardDescription}>
            <Underliner className={styles.headerWrapper} underlinerClass={styles.underliner}>
                <Typography type="h5" size="small" variant={["bold"]} className={styles.header}>{header}</Typography>
            </Underliner>
            <div className={styles.descriptionWrapper}>
                <Typography type="subtitle2" variant={["bold"]} className={styles.descriptionPoint}>Místo:</Typography>
                <Typography type="subtitle2" variant={["bold"]}>{place}</Typography>
            </div>
            <div className={styles.descriptionWrapper}>
                <Typography type="subtitle2" variant={["bold"]} className={styles.descriptionPoint}>Realizace:</Typography>
                <Typography type="subtitle2" variant={["bold"]}>{realization}</Typography>
            </div>
        </div>
    )
})
CardDescription.displayName = "CardDescription"