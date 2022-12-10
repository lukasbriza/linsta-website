import styles from '../../styles/modules/Modal.module.scss'

import { FC, SVGProps, useCallback, useEffect, useRef } from "react"
import { gsap } from 'gsap'
import { Paper } from '@lukasbriza/lbui-lib'
import { ModalProps } from './Modal.model'
import { useModal } from '@hooks'

let rendered = false
export const Modal: FC<ModalProps> = (props) => {
    const { text, sucess, closeText, button = true, timeout = 5000 } = props
    const { close } = useModal()
    const ref = useRef<HTMLElement>(null)

    const handleClose = useCallback(() => gsap.effects.hideToTop(ref.current, ref.current?.clientHeight, close), [close])

    useEffect(() => {
        const { current } = ref
        if (!rendered) {
            gsap.effects.showFromTop(current)
            rendered = true
        }
    }, [])

    useEffect(() => {
        if (!button) {
            setTimeout(() => {
                handleClose()
            }, timeout)
        }
    }, [button, handleClose, timeout])

    return (
        <Paper ref={ref} className={styles.modal} elevation={8}>
            <section className={styles.state}>
                {sucess ? <Sucess /> : <Failure />}
            </section>
            <section className={styles.section}>
                <div className={styles.text}>
                    {text}
                </div>
                {
                    button ?
                        <button
                            className={styles.button}
                            onClick={handleClose}>
                            {closeText ? closeText : "Zavřít"}
                        </button> :
                        null
                }
            </section>
        </Paper>
    )
}


const Failure: FC = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit={2}
            viewBox="0 0 24 24"
            className={styles.failure}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12.002 2.005c5.518 0 9.998 4.48 9.998 9.997C22 17.52 17.52 22 12.002 22c-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497S7.312 20.5 12.002 20.5s8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718A.75.75 0 0 1 16 8.743a.75.75 0 0 1-.219.531l-2.717 2.717 2.727 2.728a.75.75 0 0 1-1.06 1.062l-2.729-2.728-2.728 2.728a.751.751 0 0 1-1.061-1.062l2.728-2.728-2.722-2.722a.75.75 0 0 1 1.062-1.061z"
                fillRule="nonzero"
            />
        </svg>
    )
}

const Sucess: FC = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit={2}
            viewBox="0 0 24 24"
            className={styles.sucess}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998C6.48 22 2 17.52 2 12.002c0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497S7.308 20.5 11.998 20.5s8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19a.746.746 0 0 0 .552-.242l5.953-6.509a.747.747 0 0 0-.552-1.249.751.751 0 0 0-.554.243l-5.453 5.962-3.298-2.938a.746.746 0 1 0-.998 1.113z"
                fillRule="nonzero"
            />
        </svg>
    )
}

