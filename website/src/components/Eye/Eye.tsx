import styles from '../../styles/modules/Eye.module.scss'

import { FC } from "react"
import { SVGProps } from "react"
import { EyeProps } from './Eye.model'

export const Eye: FC<EyeProps> = (props) => {
    const { showPassword = false, onClick } = props
    return (
        <>
            {
                showPassword ?
                    <OpenEye onClick={onClick} className={styles.svg} /> :
                    <ClosedEye onClick={onClick} className={styles.svg} />
            }
        </>
    )
}


const OpenEye: FC<{ onClick: () => void } & SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="#575757"
                d="M12 9.005a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM12 5.5c4.613 0 8.596 3.15 9.701 7.564a.75.75 0 1 1-1.455.365 8.504 8.504 0 0 0-16.493.004.75.75 0 0 1-1.456-.363A10.003 10.003 0 0 1 12 5.5Z"
            />
        </svg>
    )
}

const ClosedEye: FC<{ onClick: () => void } & SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            {...props}
        >
            <path
                fill="#575757"
                d="m10.12 10.827 4.026 4.027a.5.5 0 0 0 .708-.708l-13-13a.5.5 0 1 0-.708.708l3.23 3.23A5.987 5.987 0 0 0 3.2 6.182a6.7 6.7 0 0 0-1.117 1.982c-.021.061-.047.145-.047.145l-.018.062s-.076.497.355.611a.5.5 0 0 0 .611-.355l.001-.003.008-.025.035-.109a5.7 5.7 0 0 1 .945-1.674 4.94 4.94 0 0 1 1.124-1.014L6.675 7.38a2.5 2.5 0 1 0 3.446 3.446Zm-3.8-6.628.854.854A6.36 6.36 0 0 1 8 5c2.044 0 3.286.912 4.028 1.817a5.695 5.695 0 0 1 .945 1.674c.017.048.028.085.035.109l.008.025v.003l.001.001a.5.5 0 0 0 .966-.257v-.003l-.001-.004-.004-.013a2.3 2.3 0 0 0-.06-.187 6.7 6.7 0 0 0-1.117-1.982C11.905 5.088 10.396 4 8.002 4c-.618 0-1.177.072-1.681.199Z"
            />
        </svg>
    )
}


