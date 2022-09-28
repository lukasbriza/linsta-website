import styles from '../../styles/modules/Footer.module.scss'

import { FC, useState } from 'react'
import { FooterTypography } from './Footer'
import { Point } from '../Point/Point'
import { useRedirect } from '../../hooks'
import { Underlining } from '@lukasbriza/lbui-lib'
import Link from 'next/link'

import { ReferenceProps } from './Footer.model'

export const Reference: FC<ReferenceProps> = (props) => {
    const { url, text } = props
    const redirect = useRedirect()

    const [hovered, setHovered] = useState<boolean>(false)

    const handleClick = (e?: React.MouseEvent) => {
        e?.preventDefault()
        redirect({ path: url })
    }
    const handleTouchStart = () => {
        setHovered(true)
    }
    const handleTouchEnd = () => {
        setTimeout(() => {
            setHovered(false)
            setTimeout(() => {
                handleClick()
            }, 500)
        }, 800)
    }

    return (
        <Link
            href={url}
        >
            <Underlining
                hoverable={false}
                origin={"center"}
                lineClass={styles.underline}
                className={styles.reference}
                on={hovered}
                onClick={handleClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <Point className={styles.point} />
                <FooterTypography>{text}</FooterTypography>
            </Underlining>
        </Link>
    )
}