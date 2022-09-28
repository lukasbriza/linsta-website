import styles from '../../styles/modules/Layout.module.scss'

import { FC, useRef, useEffect, useState } from 'react'
import clsx from 'clsx'

import { LayoutProps } from './Layout.model'

export const Layout: FC<LayoutProps> = (props) => {
    const {
        children,
        menu,
        header,
        footer,
        maxHeight = true,
        menuClass,
        layoutClass,
        headerClass,
        footerClass,
        pageClass
    } = props

    const headerRef = useRef<HTMLElement>(null)
    const menuRef = useRef<HTMLElement>(null)
    const layoutRef = useRef<HTMLElement>(null)

    const [height, setHeight] = useState<number>()

    const getHeight = () => {
        const layoutHeight = layoutRef.current ? layoutRef.current.clientHeight : 0
        const menuHeight = menuRef.current ? menuRef.current.clientHeight : 0
        const headerHeight = headerRef.current ? headerRef.current.clientHeight : 0
        return layoutHeight - menuHeight - headerHeight
    }

    const heightStyle = maxHeight ? { height: height } : undefined

    useEffect(() => {
        maxHeight && setHeight(getHeight())
    }, [maxHeight])

    return (
        <section id={styles.layout} className={layoutClass ? layoutClass : ""} ref={layoutRef}>
            <section id={styles.headerWrapper} className={clsx([headerClass, !header && styles.hide])} ref={headerRef}>
                {header}
            </section>
            <section id={styles.menuWrapper} className={clsx([menuClass])} ref={menuRef}>
                {menu}
            </section>
            <section id={styles.pageContent} className={clsx([pageClass])} style={heightStyle}>
                {children}
            </section>
            <section id={styles.footerWrapper} className={clsx([footerClass, !footer && styles.hide])}>
                {footer}
            </section>
        </section>
    )
}