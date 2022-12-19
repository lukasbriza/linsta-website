import styles from '../../styles/modules/SwiperWrapper.module.scss'

import { removeAnimation, initAnimation } from './animations'
import { FC, useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Cross } from '@components'
import Image from 'next/image';
import { ImageLoadingProps, SwiperWrapperProps } from './SwiperWrapper.model'

let mounted = false
export const SwiperWrapper: FC<SwiperWrapperProps> = (props) => {
    const { src, description, onCancel } = props
    const root = useRef<HTMLDivElement>(null)

    const handleCancel = () => {
        if (root.current) {
            const remove = removeAnimation(root.current)
            remove.then(() => { onCancel() })
        }
    }

    useEffect(() => {
        if (!mounted) {
            root.current && initAnimation(root.current)
        }
        mounted = true

        return () => {
            mounted = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.wrapper} ref={root}>
            <Cross className={styles.cross} onClick={handleCancel} />
            <Swiper
                className={styles.swiper}
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{ delay: 4000 }}
                pagination={{
                    clickable: true,
                }}
                slidesPerView={1}
                centeredSlides={true}
                centeredSlidesBounds={true}
                initialSlide={0}
                spaceBetween={10}

            >
                {src.map((id, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <section className={styles.innerSection}>
                                <ImageLoading src={id} alt={description} />
                            </section>
                        </SwiperSlide>
                    )
                })}
                <span slot="container-end" className={styles.end}>{description}</span>
            </Swiper>
        </div>
    )
}

const ImageLoading: FC<ImageLoadingProps> = (props) => {
    const { src, alt } = props
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined)

    src.then(result => {
        if (result) {
            setImgSrc(result)
        }
    })

    return (
        imgSrc ? <Image src={imgSrc} alt={alt} layout="fill" objectFit="contain" /> : <>Loading</>
    )
}

