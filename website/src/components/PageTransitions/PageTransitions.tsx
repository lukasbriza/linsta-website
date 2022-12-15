import { useRouter } from 'next/router'
import { gsap, Power1, Power2 } from 'gsap'
import React, { FC, useEffect } from 'react'
import { SwitchTransition, Transition } from 'react-transition-group'
import { useDisableScroll, useTransitionContext } from '@hooks'

let tl1: undefined | gsap.core.Timeline = undefined
let tl2: undefined | gsap.core.Timeline = undefined
let tldot: undefined | gsap.core.Timeline = undefined

const dots = () => {
    tldot = gsap.timeline()
    tldot.addLabel('start')
        .fromTo('.dot', {
            marginBottom: '5px'
        }, {
            marginBottom: '10px',
            duration: 1,
            stagger: 0.5,
            ease: Power2.easeInOut
        }, 'start').to('.dot', {
            marginBottom: '5px',
            delay: 1,
            duration: 1,
            stagger: 0.5,
            ease: Power2.easeInOut
        }, 'start').repeat(-1)
    return tldot
}

const onPageExit = () => {
    tl1 = gsap.timeline()
    tl1.addLabel('start')
        .fromTo('.transitionLayer', {
            left: 'unset',
            right: '0px',
            zIndex: 5,
            width: '0%',
            ease: Power1.easeOut
        }, {
            left: 'unset',
            right: '0px',
            width: '100%',
            duration: 0.5,
            ease: Power1.easeOut
        })
        .addLabel('fullWidth')
        .add(gsap.effects.show('.transitionSvg', { duration: 0.3, display: 'initial' }), 'fullWidth')
        .add(gsap.effects.show('.textWrapper', { duration: 0.3, display: 'flex' }), 'fullWidth')
        .add(dots(), 'fullWidth')
}

const onPageEnter = (cb: () => void) => {
    tl2 = gsap.timeline()
    tl2.addLabel('start')
        .add(gsap.effects.hide('.transitionSvg', { duration: 0.3 }), 'start')
        .add(gsap.effects.hide('.textWrapper', { duration: 0.3 }), 'start')
        .addLabel('startEndAnimation')
        .fromTo('.transitionLayer', {
            right: 'unset',
            left: '0px',
            zIndex: 5,
            width: '100%',
            ease: Power1.easeOut
        }, {
            right: 'unset',
            left: '0px',
            width: '0%',
            duration: 0.5,
            ease: Power1.easeOut,
            onComplete: () => cb()
        }, 'startEndAnimation').then(() => {
            tl1?.kill()
            tl1?.clear()
            tl1 = undefined
            tl2?.kill()
            tl2?.clear()
            tl2 = undefined
            tldot?.kill()
            tldot?.clear()
            tldot = undefined
        })
}

export const Pagetransitions: FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter()
    const { setTransitioning } = useTransitionContext()
    const [, setDisabled] = useDisableScroll()

    const handleEnter = () => {
        const handleCallback = () => {
            setTransitioning(false)
            setDisabled(false)
        }
        onPageEnter(handleCallback)
    }
    const handleExit = () => {
        setTransitioning(true)
        onPageExit()
        setDisabled(true)
    }

    return (
        <SwitchTransition>
            <Transition
                key={router.pathname}
                timeout={2000}
                in={true}
                mountOnEnter={true}
                unmountOnExit={true}
                onEnter={handleEnter}
                onExit={handleExit}
            >
                {children}
            </Transition>
        </SwitchTransition>
    )
}