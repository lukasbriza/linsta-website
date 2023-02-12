import styles from '../../styles/modules/Menu.module.scss'

import { useTranslation } from 'next-i18next'
import React, { FC, useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRedirect, useDisableScroll } from '@hooks'
import { MenuBar, MenuList, MenuItem, BasicHamburger, useElementSize } from '@lukasbriza/lbui-lib'
import { Logo, ImperativeReference } from '../Logo/Logo'
import { MenuProps } from './Menu.model'
import { Routes } from '../../models'

let rendered = false

export const Menu: FC<MenuProps> = (props) => {
    const { t } = useTranslation()
    const { items } = props
    const [hmbShow, setHmbShow] = useState<boolean>(false)
    const [showslider, setShowSlider] = useState<boolean>(false)
    const [disabled, setDisabled] = useDisableScroll()
    const menuBarRef = useRef<HTMLElement>(null)
    const hmbRef = useRef<HTMLDivElement>(null)
    const logoRef = useRef<ImperativeReference>(null)
    const { width } = useElementSize(menuBarRef)
    const redirect = useRedirect()

    const handleLogoClick = () => redirect({ path: "/" })

    useEffect(() => {
        showslider ? setDisabled(true) : setDisabled(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showslider])

    const handleHmbClick = () => setShowSlider(value => !value)

    useEffect(() => {
        if (width !== null) {
            width <= 950 ? setHmbShow(true) : setHmbShow(false)
        }
    }, [menuBarRef, width])

    useEffect(() => {
        !rendered && logoRef.current?.initialAnimation()
        rendered = true
    }, [])


    return (
        <>
            <MenuBar className={styles.menu} ref={menuBarRef}>
                <div className={styles.logoWrapper}>
                    <Logo ref={logoRef} onClick={handleLogoClick} />
                </div>
                <MenuList className={clsx([styles.menuList, hmbShow && styles.hide])}>
                    {items.map((item, index) => {
                        return (
                            <MapMenuItem key={index} item={item} />
                        )
                    })}
                </MenuList>
                <BasicHamburger
                    ref={hmbRef}
                    show={hmbShow}
                    lineType="rounded"
                    className={styles.hamburger}
                    onClick={handleHmbClick}
                />
            </MenuBar>
            <section className={clsx([styles.slider, !hmbShow && styles.hide, showslider && styles.sliderShow])}>
                <MenuList orientation={"onHeight"} className={clsx([styles.sliderListWrapper])}>
                    {items.map((item, index) => {
                        return (
                            <Link href={item.url} className={styles.menuItemWrapper} key={index}>
                                <MenuItem
                                    className={clsx([styles.menuItem, styles.sliderItem])}
                                    labelClass={clsx([styles.label, styles.sliderLabel])}
                                    label={t(`menu.${item.name}`)}
                                    iconPosition={"left"}
                                    icon={<Image src={item.src} width="22" height="22" alt="menu icon" />}
                                    underliner={false}
                                    underlinerOrigin="center"
                                    onClick={() => redirect({ path: item.url, callback: () => { setTimeout(() => { hmbRef.current?.click() }, 1000) } })}
                                />
                            </Link>
                        )
                    })}
                </MenuList>
            </section>
        </>

    )
}

const MapMenuItem: FC<{ item: { name: string, src: string, url: Routes } }> = ({ item }) => {
    const [hoverClass, setHoverClass] = useState<boolean>(false)
    const { t } = useTranslation()
    const redirect = useRedirect()

    return (
        <Link href={item.url}>
            <MenuItem
                className={styles.menuItem}
                underlinerClass={clsx([styles.underliner, hoverClass && styles.underlinerHover])}
                onMouseEnter={() => { setHoverClass(true) }}
                onTouchStart={() => { setHoverClass(true) }}
                onTouchEnd={() => { setHoverClass(false) }}
                onMouseLeave={() => { setHoverClass(false) }}
                labelClass={styles.label}
                underliner={true}
                label={t(`menu.${item.name}`)}
                iconPosition={"left"}
                icon={<Image src={item.src} width="18" height="18" alt="menu icon" />}
                underlinerOrigin="left"
                onClick={() => redirect({ path: item.url })}
            />
        </Link>
    )
}