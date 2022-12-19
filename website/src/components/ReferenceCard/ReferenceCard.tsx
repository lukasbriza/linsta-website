import styles from '../../styles/modules/ReferenceCard.module.scss'

import { FC, useState, useEffect, useContext } from 'react'
import { SwiperContext } from '@components'
import Image from 'next/image'
import { Card, Underliner, Typography } from '@lukasbriza/lbui-lib'
import { getImg } from '@fetchers'

import { ReferenceCardProps } from './ReferenceCard.model'


export const ReferenceCard: FC<ReferenceCardProps> = (props) => {
    const { src, detail, ...other } = props
    const [elevation, setElevation] = useState<3 | 15>(3)
    const [loading, setLoading] = useState<boolean>(true)
    const [imgArray, setImgArray] = useState<string[]>([])

    const { show } = useContext(SwiperContext)

    const handleClick = () => {
        const newArray = imgArray.map(src => {
            return downloadImage(src)
        })
        show?.({ src: newArray, description: detail })
        Promise.all(newArray).then((value) => { setImgArray(value) })
    }


    useEffect(() => {
        if (imgArray.length === 0 || !isBlob(imgArray[0])) {
            getImg(src[0]).then(result => {
                const { sucess, data } = result
                const [first, ...other] = src
                const blob = URL.createObjectURL(new Blob([data], { type: 'image/webp' }))
                sucess && data && setImgArray([blob, ...other])
            })
        }
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Card
            onMouseEnter={() => setElevation(15)}
            onMouseLeave={() => setElevation(3)}
            onClick={handleClick}
            elevation={elevation}
            body={<CardBody src={imgArray[0]} loading={loading} />}
            description={<CardDescription {...other} />}
            square={true}
            className={styles.card}
        />
    )
}

const CardBody: FC<{ src: string | undefined, loading: boolean }> = ({ src, loading }) => {
    return (
        <div className={styles.cardBody}>
            {
                src && !loading ?
                    <Image
                        src={src}
                        alt="References card background"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        quality={100}
                    /> :
                    <>Loading</>
            }
        </div>
    )
}
const CardDescription: FC<{ header: string, place: string, realization: string }> = ({ header, place, realization }) => {

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
}

const downloadImage = async (src: string) => {
    if (!isBlob(src)) {
        return await getImg(src).then(result => {
            const { sucess, data } = result
            const blob = URL.createObjectURL(new Blob([data], { type: 'image/webp' }))
            if (sucess && data) {
                return blob
            }
            return src
        })
    }
    return src
}

export const isBlob = (string: string) => {
    return string.includes("blob");
};

