import styles from '../../styles/modules/Header.module.scss'

import React, { FC } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRedirect } from '../../hooks'
import { HeaderProps, LeftItemProps, RightItemProps } from './Header.model'
import { MenuItem, MenuList } from '@lukasbriza/lbui-lib'

export const Header: FC<HeaderProps> = (props) => {
    const { leftItems, rightItems } = props
    const redirect = useRedirect()
    return (
        <section className={styles.header}>
            <MenuList className={styles.leftSection}>
                {leftItems.map((item, index) => {
                    return (
                        <Link key={index} href={item.url}>
                            <MenuItem
                                onClick={() => { redirect({ path: item.url }) }}
                                className={styles.menuItem}
                                labelClass={styles.label}
                                label={item.name}
                                icon={<Image src={item.src} width="10" height="10" alt="header icon" />}
                                iconPosition="left"
                                uppercase={false}
                                underliner={false}
                            />
                        </Link>
                    )
                })}
            </MenuList>
            <MenuList className={styles.rightSection}>
                {rightItems.map((item, index) => {
                    return (
                        <Link key={index} href={item.url} >
                            <p className={clsx([styles.label, styles.login])}>Přihlásit</p>
                        </Link>
                    )
                })}
            </MenuList>
        </section>
    )
}