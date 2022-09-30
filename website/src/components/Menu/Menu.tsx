import styles from '../../styles/modules/Menu.module.scss'

import React, { FC, useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRedirect } from '../../hooks'
import { MenuBar, MenuList, MenuItem, BasicHamburger, useElementSize } from '@lukasbriza/lbui-lib'
import { Logo } from '../Logo/Logo'
import { MenuProps } from './Menu.model'


export const Menu: FC<MenuProps> = (props) => {
    const { items } = props
    const [hmbShow, setHmbShow] = useState<boolean>(false)
    const [showslider, setShowSlider] = useState<boolean>(false)
    const menuBarRef = useRef<HTMLElement>(null)
    const { width } = useElementSize(menuBarRef)
    const redirect = useRedirect()

    const preventScroll = (e: WheelEvent) => {
        console.log('scroll')
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    useEffect(() => {
        if (showslider) {
            document.addEventListener('wheel', preventScroll, { passive: false })
        }
        document.removeEventListener('wheel', preventScroll)
    }, [showslider])

    const handleHmbClick = () => setShowSlider(value => !value)

    useEffect(() => {
        if (width !== null) {
            width <= 870 ? setHmbShow(true) : setHmbShow(false)
        }
    }, [menuBarRef, width])



    return (
        <>
            <MenuBar className={styles.menu} ref={menuBarRef}>
                <div className={styles.logoWrapper}>
                    <Logo className={styles.logo} />
                </div>
                <MenuList className={clsx([styles.menuList, hmbShow && styles.hide])}>
                    {items.map((item, index) => {
                        return (
                            <Link key={index} href={item.url}>
                                <MenuItem
                                    className={styles.menuItem}
                                    labelClass={styles.label}
                                    label={item.name}
                                    iconPosition={"left"}
                                    icon={<Image src={item.src} width="18" height="18" alt="menu icon" />}
                                    underliner={true}
                                    underlinerOrigin="center"
                                    onClick={() => redirect({ path: item.url })}
                                />
                            </Link>
                        )
                    })}
                </MenuList>
                <BasicHamburger
                    show={hmbShow}
                    lineType="rounded"
                    className={styles.hamburger}
                    onClick={handleHmbClick}
                />
            </MenuBar>
            <section className={clsx([styles.slider, !hmbShow && styles.hide, showslider && styles.sliderShow])}>
                <MenuList orientation={"onHeight"} className={clsx([styles.menuList, styles.sliderListWrapper])}>
                    {items.map((item, index) => {
                        return (
                            <Link href={item.url} className={styles.menuItemWrapper} key={index}>
                                <MenuItem
                                    className={clsx([styles.menuItem, styles.sliderItem])}
                                    labelClass={clsx([styles.label, styles.sliderLabel])}
                                    label={item.name}
                                    iconPosition={"left"}
                                    icon={<Image src={item.src} width="16" height="16" alt="menu icon" />}
                                    underliner={false}
                                    underlinerOrigin="center"
                                    onClick={() => redirect({ path: item.url })}
                                />
                            </Link>
                        )
                    })}
                </MenuList>
            </section>
        </>

    )
}