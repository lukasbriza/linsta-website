import React, { FC, useEffect, useRef } from "react"
import { Transition } from 'react-transition-group'
import { gsap, Power2 } from 'gsap'
import { useElementOnScreen } from "@hooks"
import { Props } from "@lukasbriza/lbui-lib"

const onEnterAnimation = (e: unknown) => {
    gsap.fromTo(e as gsap.TweenTarget, { opacity: 0 }, { opacity: 1, duration: 1, ease: Power2.easeIn })
}
const onExitAnimation = (e: unknown) => { console.log(e) }

type FadeInPops = {
    children: React.ReactNode
    canAnimate?: boolean
} & Props<HTMLDivElement>

export const FadeIn: FC<FadeInPops> = (props) => {
    const { children, canAnimate, ...otherProps } = props
    const element = useRef(null)
    const isObservable = useElementOnScreen(element)

    useEffect(() => {

    }, [isObservable])

    return (

        <Transition
            in={canAnimate !== undefined ? canAnimate && isObservable : isObservable}
            timeout={1000}
            nodeRef={element}
            onEnter={() => onEnterAnimation(element.current)}
            onExit={() => onExitAnimation(element.current)}
        >
            <div ref={element} {...otherProps}>
                {props.children}
            </div>
        </Transition>


    )
}