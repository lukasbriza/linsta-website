import styles from '../../styles/modules/Menu.module.scss'

import { FC, useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { MenuBar, MenuList, MenuItem, BasicHamburger, useElementSize } from '@lukasbriza/lbui-lib'
import { Logo } from '../Logo/Logo'
import { MenuProps } from './Menu.model'


export const Menu: FC<MenuProps> = (props) => {
    const { items } = props
    const [hmbShow, setHmbShow] = useState<boolean>(false)
    const [showslider, setShowSlider] = useState<boolean>(false)
    const menuBarRef = useRef<HTMLElement>(null)
    const { width } = useElementSize(menuBarRef)

    const handleHmbClick = () => setShowSlider(value => !value)

    useEffect(() => {
        if (width !== null) {
            width <= 780 ? setHmbShow(true) : setHmbShow(false)
        }
    }, [width])

    return (
        <>
            <MenuBar className={styles.menu} ref={menuBarRef}>
                <div className={styles.logoWrapper}>
                    <Logo className={styles.logo} />
                </div>
                <MenuList className={clsx([styles.menuList, hmbShow && styles.hide])}>
                    {items.map((item, index) => {
                        return (
                            <MenuItem
                                className={styles.menuItem}
                                labelClass={styles.label}
                                key={index}
                                label={item.name}
                                iconPosition={"left"}
                                icon={<Image src={item.src} width="14" height="14" alt="menu icon" />}
                                underliner={true}
                                underlinerOrigin="center"
                                onClick={() => console.log("redirect:", item.url)}
                            />
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
                <MenuList orientation={"onHeight"} className={styles.menuList}>
                    {items.map((item, index) => {
                        return (
                            <div className={styles.menuItemWrapper} key={index}>
                                <MenuItem
                                    className={clsx([styles.menuItem, styles.sliderItem])}
                                    labelClass={styles.label}
                                    label={item.name}
                                    iconPosition={"left"}
                                    icon={<Image src={item.src} width="14" height="14" alt="menu icon" />}
                                    underliner={false}
                                    underlinerOrigin="center"
                                    onClick={() => console.log("redirect:", item.url)}
                                />
                            </div>
                        )
                    })}
                </MenuList>
            </section>
        </>

    )
}