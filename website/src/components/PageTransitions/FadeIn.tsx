import styles from '../../styles/modules/FadeIn.module.scss'

import React, { FC, useMemo, useRef, useState } from "react"
import { Transition } from 'react-transition-group'
import { gsap, Power2 } from 'gsap'
import { useElementOnScreen } from "@hooks"
import { Props } from "@lukasbriza/lbui-lib"
import clsx from "clsx"

const onEnterAnimation = (e: unknown, timeout: number, delay: number, cb: React.Dispatch<React.SetStateAction<boolean>>) => {
    gsap.fromTo(
        e as gsap.TweenTarget,
        {
            opacity: 0,
            y: 15
        },
        {
            opacity: 1,
            y: 0,
            duration: timeout / 1000,
            delay: delay,
            ease: Power2.easeIn,
            onComplete: () => { cb(true) }
        }
    )
}
const onExitAnimation = (e: unknown, timeout: number) => {
    gsap.to(e as gsap.TweenTarget, {
        opacity: 0,
        duration: timeout / 1000,
        ease: Power2.easeIn,
    })
}

type FadeInPops = {
    children: React.ReactNode | React.ReactNode[];
    canAnimate?: boolean;
    delay?: number;
    stagger?: number;
    timeout?: number;
} & Props<HTMLDivElement>

export const FadeIn: FC<FadeInPops> = (props): any => {
    const {
        children,
        canAnimate,
        className,
        delay = 0,
        stagger = 0,
        timeout = 600,
        ...otherProps
    } = props

    const [animated, setAnimated] = useState(false)
    const el = useRef(null)
    const isObservable = useElementOnScreen(el)
    const isAnimatable = useMemo(() => {
        if (animated) {
            return true
        } else {
            return canAnimate !== undefined ? canAnimate && isObservable : isObservable
        }
    }, [animated, canAnimate, isObservable])

    const totalDelay = delay + stagger

    return (
        <Transition
            in={isAnimatable}
            timeout={timeout}
            nodeRef={el}
            onEnter={() => onEnterAnimation(el.current, timeout, totalDelay, setAnimated)}
            onExit={() => onExitAnimation(el.current, timeout)}
        >
            <div className={clsx([styles.defaultState, className])} ref={el} {...otherProps}>
                {props.children}
            </div>
        </Transition>


    )
}