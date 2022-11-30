import styles from '../../styles/modules/SwiperWrapper.module.scss'

import { FC, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Cross } from '@components'
import Image from 'next/image';
import { ImageLoadingProps, SwiperWrapperProps } from './SwiperWrapper.model'


export const SwiperWrapper: FC<SwiperWrapperProps> = (props) => {
    const { src, description, onCancel } = props

    return (
        <div className={styles.wrapper}>
            <Cross className={styles.cross} onClick={onCancel} />
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

